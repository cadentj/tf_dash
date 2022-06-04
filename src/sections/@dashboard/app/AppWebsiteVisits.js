// THUNDER UPDATE IMPORTS
import { useState } from 'react';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import Calendar from "react-modern-calendar-datepicker";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReplayIcon from '@mui/icons-material/Replay';
import '../../../theme/styles.css';

// base
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box, Grid, IconButton, CardActions } from '@mui/material';
// components
import { BaseOptionChart } from '../../../components/chart';

// ----------------------------------------------------------------------

AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function AppWebsiteVisits({ title, subheader, chartLabels, chartData, ...other }) {
  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        },
      },
    },
  });

  const defaultFrom = {
    year: 2019,
    month: 4,
    day: 16,
  };
  const defaultTo = {
    year: 2019,
    month: 4,
    day: 19,
  };
  const defaultValue = {
    from: defaultFrom,
    to: defaultTo,
  };
  const [selectedDayRange, setSelectedDayRange] = useState(
    defaultValue
  );

  const renderCustomInput = ({ ref }) => (
    <input
      readOnly
      ref={ref} // necessary
      placeholder="Select Range"
      value={selectedDayRange.from && selectedDayRange.to ? `${selectedDayRange.from.month}/${selectedDayRange.from.day} - ${selectedDayRange.to.month}/${selectedDayRange.to.day}` : ''}
      style={{
        textAlign: 'center',
        padding: '.5rem 1rem',
        fontSize: '.8rem',
        border: '1px solid',
        borderRadius: '10px',
        color: '#A9A9A9',
        outline: 'none',
        marginRight:'10px',
      }}
      className="my-custom-input-class" // a styling class
    />
  )

  return (
    <Card {...other}>

      <Grid container spacing={2}>

        <Grid item xs={8} >
          <CardHeader
            title={title}
            subheader={subheader}
          />
        </Grid>

        <Grid item xs={4} style={{
          textAlign: "center",
          direction: "row",
          justifyContent: "right",
          display: "flex"
        }}>
          <CardActions>
            <Calendar
              value={selectedDayRange}
              onChange={setSelectedDayRange}
              colorPrimary="#0fbcf9"
              colorPrimaryLight="rgba(75, 207, 250, 0.4)"
              renderInput={renderCustomInput}
              calendarClassName="responsive-calendar"
              shouldHighlightWeekends
            />
            <IconButton aria-label="settings">
              <ReplayIcon />
            </IconButton>
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          </CardActions>
        </Grid>

        <Grid item xs={12} >
          <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
          </Box>
        </Grid>

      </Grid>

    </Card>
  );
}
