export type listBreadcrumb = {
  label: string
  href: string,
}
export type HeaderBreadcrumbProps = {
  data: listBreadcrumb[]
  title?: string
}

interface TitleProps {
  children?: React.ReactNode;
}