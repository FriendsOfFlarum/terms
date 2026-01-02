import Extend from 'flarum/common/extenders';
import Policy from './models/Policy';

export default [
  new Extend.Store() //
    .add('fof-terms-policies', Policy),
];
