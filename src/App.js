import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { userApi } from "./api";
import {
  Birthday,
  ExchangeRate,
  Header,
  MenuAppbar,
} from "./components/common";
import Deposit from "./components/common/Deposit";
import Footer from "./components/common/Footer";
import Contact from "./features/Contact";
import Detail from "./features/Detail";
import News from "./features/News";
import { showBirthday } from "./utils";

function App() {
  const [openDialogBirthday, setOpenDialogBirthday] = useState(false);
  const [birthdays, setBirthdays] = useState([]);

  const handleCloseDialogBirthday = () => {
    setOpenDialogBirthday(false);

    Cookies.set("Birthday", "open-dialog-happy-birthday-users", {
      expires: 0.5,
      path: "/",
    });
  };

  useEffect(() => {
    const fetchOpenBirthday = async () => {
      if (
        showBirthday(birthdays).length > 0 &&
        Cookies.get("Birthday") === undefined
      ) {
        await setOpenDialogBirthday(true);
      }
    };

    const timer = setTimeout(() => {
      fetchOpenBirthday();
    }, 200);

    return () => clearTimeout(timer);
  }, [birthdays]);

  const routes = [
    {
      path: "/*",
      element: <News />,
      role: "user",
    },
    {
      path: "/news/detail/:id",
      element: <Detail />,
      role: "user",
    },
    {
      path: "/contact",
      element: <Contact />,
      role: "user",
    },
  ];

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        const birthdays = await userApi.getAll();
        setBirthdays(birthdays);
      } catch (error) {
        console.log("Lấy dữ liệu chúc mừng sinh nhật có lỗi.", error);
      }
    };
    fetchBirthdays();
  }, []);

  return (
    <div className="App">
      <Header />
      <Divider />
      <MenuAppbar />
      <Box className="main">
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7} sm={12}>
              <Routes>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </Grid>
            <Grid item xs={12} md={5} sm={12}>
              <Paper>
                <ExchangeRate />
              </Paper>
              <Paper sx={{ marginTop: "35px" }}>
                <Deposit />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />

      <Dialog
        fullWidth="sm"
        maxWidth="sm"
        open={openDialogBirthday}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialogBirthday(event, reason);
          }
        }}
      >
        <DialogContent sx={{ padding: 0, width: "650", height: "365px" }}>
          <Birthday birthdays={birthdays} />
        </DialogContent>
        <DialogActions className="dialogAction">
          <Button
            className="dialogButtonCancel"
            onClick={handleCloseDialogBirthday}
          >
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
