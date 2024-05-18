import DashboardLayout from 'DashboardLayout/DashboardLayout'
import BarChartComponent from './components/BarCharts/BarCharts'
import {Grid } from '@mui/material'
import PieChartGraph from './components/PieCharts/PieCharts'

const Analytics = () => {
  return (
    <DashboardLayout title="Analytics">
      <h3>ANALYTICS RECORDS </h3>
      <Grid container spacing={2}>
        <Grid item md={8}>
        <BarChartComponent />
        </Grid>
        <Grid item md={4}>
        <PieChartGraph />
        </Grid>
      </Grid>
    </DashboardLayout>
  )
}

export default Analytics
