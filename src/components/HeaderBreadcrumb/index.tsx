import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import LinkMaterial from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link';
import { HeaderBreadcrumbProps } from './types';

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}



export default function HeaderBreadcrumb({data}: HeaderBreadcrumbProps) {
  const breadcrumbs = [
    <LinkMaterial component={Link}  underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
      MUI
    </LinkMaterial>,
    <LinkMaterial
      component={Link}
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      Core
    </LinkMaterial>,
    <Typography key="3" color="text.primary">
      Breadcrumb
    </Typography>,
  ];

  return (
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
      {data && data.map((item, index) => {
          
        if (index === data.length - 1) {
          return (
            <Typography key={item.label+index} color="text.primary">
              {item.label}
            </Typography>
          )
        }
        return (
            <LinkMaterial
              component={Link}
              underline="hover"
              key={item.label+index}
              color="inherit"
              href={item.href}
            >
              {item.label}
            </LinkMaterial>
          )
        })}
      </Breadcrumbs>
    
  );
}