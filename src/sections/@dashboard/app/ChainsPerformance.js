// THUNDER UPDATE IMPORTS
import { useState } from 'react';

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow, { tableRowClasses } from "@mui/material/TableRow";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import {
  ButtonBase,
  Card,
  Typography,
  Modal,
  Box,
  Stack,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------


const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

ChainsPerformance.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function createData(
  name,
  number,
  relays,
  change,
) {
  return { name, number, relays, change };
}

const rows = [
  createData('Frozen Polygon Mainnet', '0009', '223,260,309', '0.5%'),
  createData('Harmony Shard 0', '0040', '212,311,840', '0.7%'),
  createData('Gnosis - xDai', '0027', '190,516,420', '6.2%'),
  createData('BSC Mainnet', '0004', '64,432,762', '57.7%'),
];

export default function ChainsPerformance({ title, total, icon, color = 'primary', sx, ...other }) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (

    <Card
      sx={{
        boxShadow: 0,
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <ButtonBase
        onClick={handleOpen}
      >
        <Stack sx={{
          textAlign: "left",
          direction: "row",
          justifyContent: "left",
          display: "flex",
        }}>
          <CardHeader title={title} />

          <CardContent sx={{ paddingTop: "10px" }}>
            <TableContainer height="10px">
              <Table size="small"sx={{
                minWidth: 250,
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: ".5px dashed grey",
                },
              }}>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell sx={{ padding: "3px" }} component="th" scope="row">
                        <Typography variant="subtitle2">{row.name}</Typography>
                        <Box flex-direction="row" display="flex">
                          <Typography sx={{ fontSize: "10px", pr: "15px" }}>{row.number}</Typography>
                          <Typography sx={{ fontSize: "10px" }}>{row.relays}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ padding: "3px"}} align="right">
                        <Typography fontSize="14px" color="green">
                          {row.change}
                          <ArrowDropUpIcon sx={{fontSize:"medium"}}/>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Stack>
      </ButtonBase>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </Card>
  );
}
