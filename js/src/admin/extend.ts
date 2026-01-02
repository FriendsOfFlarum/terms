import app from 'flarum/admin/app';
import Extend from 'flarum/common/extenders';
import commonExtend from '../common/extend';
import TermsSettingsPage from './components/TermsSettingsPage';

export default [
  ...commonExtend,

  new Extend.Admin() //
    .page(TermsSettingsPage)
    .permission(
      () => ({
        icon: 'fas fa-paperclip',
        label: app.translator.trans('fof-terms.admin.permissions.see-user-policies-state'),
        permission: 'fof-terms.see-user-policies-state',
      }),
      'moderate'
    )
    .permission(
      () => ({
        icon: 'fas fa-paperclip',
        label: app.translator.trans('fof-terms.admin.permissions.postpone-policies-accept'),
        permission: 'fof-terms.postpone-policies-accept',
      }),
      'moderate'
    )
    .permission(
      () => ({
        icon: 'fas fa-paperclip',
        label: app.translator.trans('fof-terms.admin.permissions.export-policies'),
        permission: 'fof-terms.export-policies',
      }),
      'moderate'
    ),
];
