export interface BlogPost {
  id: string;
  title: string;
  content: string;
  featured_image_url: string | null;
  funding_amount: number | null;
  company_name: string;
  deal_date: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export type BlogPostInsert = Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>;
export type BlogPostUpdate = Partial<BlogPostInsert>;
