import React,{useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useMediaQuery } from '@mui/material';

interface propType{
  title:number
  setTitle:Function
}

const ResponsiveAppBar = ({title,setTitle}:propType) => {
    const isWide=useMediaQuery('(min-width:768px)')

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const Da=isWide?<Box sx={{ flexGrow: 0 }}>
  <Tooltip title="返回首页">
    <IconButton onClick={()=>window.location.pathname="/"} sx={{ my: 2, color: 'white', display: 'block'}}>
    Innovative Base of Physics Experiment
    </IconButton>
  </Tooltip>
</Box>:<></>
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            IBPE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
            </IconButton>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
             IBPE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
              <Button onClick={()=>setTitle(1)} sx={{ my: 2, color: 'white', display: 'block' }}>阅读小组用--六楼公房</Button>
              <Button onClick={()=>setTitle(2)} sx={{ my: 2, color: 'white', display: 'block' }}>探究小组用--科技楼实验室</Button>
          </Box>
          {Da}
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
