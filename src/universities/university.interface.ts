export interface IUniversity {
  id?: string;
  created_at?: string;
  updated_at?: string;
  alpha_two_code: string;
  name: string;
  web_pages?: string[];
  domains?: string[];
  country?: string;
  'state-province'?: string;
}
