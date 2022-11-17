import { Paper, Box, Container } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import { DataGrid } from "@mui/x-data-grid";
import DoneIcon from "@mui/icons-material/Done";
import VerifiedUserSharpIcon from "@mui/icons-material/VerifiedUserSharp";
import PendingActionsSharpIcon from "@mui/icons-material/PendingActionsSharp";
import DriveFileRenameOutlineSharpIcon from "@mui/icons-material/DriveFileRenameOutlineSharp";

const Dashboard = () => {
  const rows = [
    {
      id: 1,
      propNo: "0134220001821",
      policyNo: "0134050541",
      name: "K M Jiaul Islam Jibon",
      dob: "10-Mar-1994",
      nid: "7348605150",
      createdAt: "12-Nov-2022",
      status: "done",
    },
    {
      id: 2,
      propNo: "0134220001822",
      policyNo: "",
      name: "Ratna Khatun",
      dob: "1-Sep-1996",
      nid: "7348605151",
      createdAt: "15-Nov-2022",
      status: "pending",
    },
    {
      id: 3,
      propNo: "0134220001823",
      name: "K M Jamirul Islam Jamil",
      policyNo: "",
      dob: "1-Sep-1988",
      nid: "7348605154",
      createdAt: "17-Nov-2022",
      status: "draft",
    },
  ];

  const columns = [
    { field: "id", headerName: "SL", width: 80 },
    { field: "propNo", headerName: "POROPOSAL", width: 150 },
    { field: "policyNo", headerName: "POLICY", width: 150 },
    {
      field: "name",
      headerName: "NAME",
      width: 120,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span>{params.value}</span>
        </Tooltip>
      ),
    },
    { field: "createdAt", headerName: "CREATED ON", width: 150 },
    {
      field: "dob",
      headerName: "BIRTHDAY",
      width: 150,
      renderHeader: (params) => (
        <strong>
          {"BIRTHDAY"}
          <span role="img" aria-label="bday">
            🎂
          </span>
        </strong>
      ),
      sortable: false,
    },
    { field: "nid", headerName: "NID", width: 150, sortable: false },
    {
      field: "status",
      headerName: "STATUS",
      width: 150,
      renderCell: (params) => {
        {
          switch (params.value) {
            case "done":
              return (
                <Chip
                  icon={<VerifiedUserSharpIcon />}
                  size="small"
                  label={params.value.toUpperCase()}
                  color="success"
                  variant="outlined"
                />
              );
            case "pending":
              return (
                <Chip
                  icon={<PendingActionsSharpIcon />}
                  size="small"
                  label={params.value.toUpperCase()}
                  color="warning"
                  variant="outlined"
                />
              );
            case "draft":
              return (
                <Chip
                  icon={<DriveFileRenameOutlineSharpIcon />}
                  size="small"
                  label={params.value.toUpperCase()}
                  variant="outlined"
                />
              );
          }
        }
      },
    },
  ];

  const handleRowClick = (params, events, details) => {
    console.log(params.row.id);
  };
  return (
    <>
      <Box sx={{ my: 4 }}>
        <Container>
          <Paper>
            <div>Dashboard Working</div>
          </Paper>

          <Paper sx={{ my: 2 }}>
            <Box sx={{ height: 300, width: "100%" }}>
              <DataGrid
                onRowClick={handleRowClick}
                density="compact"
                rows={rows}
                columns={columns}
              />
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
