import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { styled } from '@mui/material/styles';

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow, { tableRowClasses } from "@mui/material/TableRow";

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

// components
import { BaseOptionChart } from '../../../components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;

const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  '& .apexcharts-canvas svg': {
    height: CHART_HEIGHT,
  },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

AppCurrentSubject.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function AppCurrentSubject({ title, subheader, chartData, chartColors, chartLabels, ...other }) {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: 2 },
    fill: { opacity: 0.48 },
    legend: { floating: true, horizontalAlign: 'center' },
    xaxis: {
      categories: chartLabels,
      labels: {
        style: {
          colors: chartColors,
        },
      },
    },
  });

  function createData(
    name,
    calories,
    fat,
    carbs,
    protein,
  ) {
    return { name, calories, fat };
  }

  const rows = [
    createData('Frozen Polygon Mainnet (0009)', '223,260,309', '0.5%'),
    createData('Harmony Shard 0 (0040)', '212,311,840', '0.7%'),
    createData('Gnosis - xDai (0027)', '190,516,420', '6.2%'),
    createData('BSC Mainnet (0004)', '64,432,762', '57.7%'),
  ];

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <CardContent>
        <TableContainer>
          <Table size="small" aria-label="a dense table" sx={{
            minWidth: 5,
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "none",
            },
          }}>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell sx={{ padding: "0" }} component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ paddingY: "0" }} align="right">{row.calories}</TableCell>
                  <TableCell sx={{ padding: "0" }} align="right"><Typography fontSize="14px" color="green">{row.fat}</Typography></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
