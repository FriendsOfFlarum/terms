export * from 'flarum/common/models/User';

declare module 'flarum/common/models/User' {
  export default interface User {
    fofTermsPoliciesHasUpdate(): boolean;
    fofTermsPoliciesMustAccept(): boolean;
    fofTermsPoliciesState(): Record<
      number,
      {
        accepted_at: string;
        has_update: boolean;
        is_accepted: boolean;
        must_accept: boolean;
      }
    >;
  }
}
