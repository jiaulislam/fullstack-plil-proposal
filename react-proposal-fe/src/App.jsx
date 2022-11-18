import { useState } from "react";
import "./App.css";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  Avatar,
} from "@mui/material";
import { mdTheme } from "./theme";
import { Navbar } from "./components/sections/Navbar";
import { Drawer } from "./components/sections/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { mainListItems, secondaryListItems } from "./listItems";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import List from "@mui/material/List";

import { Routes, Route } from "react-router-dom";
import WebProposal from "./components/WebProposal";
import Dashboard from "./components/Dashboard";
import logo from "./assets/logo.png";
import Verification from "./components/Verification";

function App() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* Appbar */}
        <Navbar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Pragati Life Insurance
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </Navbar>

        {/* Drawer */}
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: [1],
            }}
          >
            <Avatar alt="brand logo" src={logo} />
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              component={"h1"}
              variant={"h6"}
            >
              PLIL
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>

        {/* Content to Put  */}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          {/* To keep the right top margin */}
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          ></Toolbar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/proposals" element={<WebProposal />} />
            <Route path="/ec-verification" element={<Verification />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
