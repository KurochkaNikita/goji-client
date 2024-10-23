export type TNextPage<P = never> = {
  params: Record<string, string> & P;
  searchParams: Record<string, string>;
};

export type TBreadcrumbs = {
  link: string;
  label: string;
};
