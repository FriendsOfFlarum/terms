import Extend from 'flarum/common/extenders';
import commonExtend from '../common/extend';
import User from 'flarum/common/models/User';
import Forum from 'flarum/common/models/Forum';

export default [
  ...commonExtend,

  new Extend.Model(User) //
    .attribute('fofTermsPoliciesState')
    .attribute<boolean>('fofTermsPoliciesHasUpdate')
    .attribute<boolean>('fofTermsPoliciesMustAccept')
    .attribute<boolean>('seeFoFTermsPoliciesState'),

  new Extend.Model(Forum) //
    .attribute<{ canSeeUserPoliciesState: boolean }>('fof-terms')
    .hasMany('fofTermsPolicies'),
];
