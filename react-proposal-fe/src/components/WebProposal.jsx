import {
  Paper,
  Box,
  Container,
  Fab,
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";
import Pill from "./atoms/Pill";
import { rows } from "../services/proposalDatatable";
import { useState } from "react";
import VerifiedUserSharpIcon from "@mui/icons-material/VerifiedUserSharp";
import PendingActionsSharpIcon from "@mui/icons-material/PendingActionsSharp";
import DriveFileRenameOutlineSharpIcon from "@mui/icons-material/DriveFileRenameOutlineSharp";
import {Link} from "react-router-dom"

const WebProposal = () => {
  const [pageSize, setPageSize] = useState(10);
  const [snakOpen, setSnakOpen] = useState(false);
  const vertical = "bottom";
  const horizontal = "right";


  const handleRowClick = (params) => {
    if (params.row.policyNo !== "") {
      setSnakOpen(true);
      return;
    }else {
      setSnakOpen(false);
      console.log(params.row.propNo);
    }
  };

  // columns for datagrid
  const columns = [
    { field: "id", headerName: "SL", width: 80 },
    { field: "propNo", headerName: "POROPOSAL", width: 150 },
    { field: "policyNo", headerName: "POLICY", width: 150 },
    {
      field: "name",
      headerName: "NAME",
      width: 150,
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
      width: 120,
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
      width: 120,
      renderCell: (params) => {
        {
          switch (params.value) {
            case "done":
              return (
                <Pill
                  label={params.value}
                  icon={<VerifiedUserSharpIcon />}
                  color="success"
                />
              );
            case "pending":
              return (
                <Pill
                  label={params.value}
                  icon={<PendingActionsSharpIcon />}
                  color="warning"
                />
              );
            case "draft":
              return (
                <Pill
                  label={params.value}
                  icon={<DriveFileRenameOutlineSharpIcon />}
                />
              );
          }
        }
      },
    },
  ];

  return (
    <>
      <Box sx={{ my: 4 }}>
        <Container>
          <Paper sx={{ my: 2 }}>
            <Box sx={{ height: 460, width: "100%" }}>
              <DataGrid
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[10, 25, 50]}
                onRowClick={handleRowClick}
                density="compact"
                rows={rows}
                columns={columns}
              />
            </Box>
          </Paper>

          {/* Create New Proposal Section */}
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Fab color="primary" aria-label="add" LinkComponent={Link} to="/ec-verification">
              <AddIcon />
            </Fab>
          </Box>
          
          {/* Any dispute show alert */}
          <Snackbar
            open={snakOpen}
            autoHideDuration={4000}
            anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
            key={vertical + horizontal}
          >
            <Alert
              onClose={() => {
                setSnakOpen(false);
              }}
              variant="filled"
              severity="error"
              sx={{ width: "100%" }}
            >
              <AlertTitle>Error</AlertTitle>
              Proposal can't be modified once policy done!
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </>
  );
};
export default WebProposal;
