import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Divider,
} from '@mui/material';
import { ArrowBack, Save } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const industries = [
  'Steel & Manufacturing', 'IT Services', 'Automotive', 'Pharmaceuticals',
  'Infrastructure', 'Financial Services', 'FMCG', 'Textiles', 'Chemicals', 'Other',
];

const steps = ['Company Info', 'Financial Data', 'Review'];

const validationSchema = Yup.object({
  name: Yup.string().required('Company name is required'),
  industry: Yup.string().required('Industry is required'),
  cin: Yup.string(),
  revenue: Yup.number().positive('Must be positive').required('Revenue is required'),
  totalAssets: Yup.number().positive().nullable(),
  totalLiabilities: Yup.number().min(0).nullable(),
  currentAssets: Yup.number().min(0).nullable(),
  currentLiabilities: Yup.number().min(0).nullable(),
  inventory: Yup.number().min(0).nullable(),
  receivables: Yup.number().min(0).nullable(),
  payables: Yup.number().min(0).nullable(),
  totalDebt: Yup.number().min(0).nullable(),
  equity: Yup.number().nullable(),
  interestExpense: Yup.number().min(0).nullable(),
  ebit: Yup.number().nullable(),
  cogs: Yup.number().min(0).nullable(),
});

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);

  const formik = useFormik({
    initialValues: {
      name: '', industry: '', cin: '', revenue: '', totalAssets: '', totalLiabilities: '',
      currentAssets: '', currentLiabilities: '', inventory: '', receivables: '', payables: '',
      totalDebt: '', equity: '', interestExpense: '', ebit: '', cogs: '',
    },
    validationSchema,
    onSubmit: (values) => {
      toast.success('Company created successfully!');
      navigate('/companies');
    },
  });

  const handleNext = () => {
    if (activeStep === 0) {
      const errors = ['name', 'industry', 'revenue'].filter((f) => !formik.values[f]);
      if (errors.length) {
        errors.forEach((f) => formik.setFieldTouched(f, true));
        return;
      }
    }
    setActiveStep((s) => s + 1);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/companies')} sx={{ mb: 2 }}>
        Back to Companies
      </Button>

      <Typography variant="h4" fontWeight={700} gutterBottom>Add New Company</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter company information and financial data for credit analysis
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      <form onSubmit={formik.handleSubmit}>
        {activeStep === 0 && (
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Company Information</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Company Name" name="name" required
                    value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth select label="Industry" name="industry" required
                    value={formik.values.industry} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.industry && Boolean(formik.errors.industry)} helperText={formik.touched.industry && formik.errors.industry}>
                    {industries.map((i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="CIN (Corporate Identity Number)" name="cin"
                    value={formik.values.cin} onChange={formik.handleChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Annual Revenue (INR)" name="revenue" type="number" required
                    value={formik.values.revenue} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.revenue && Boolean(formik.errors.revenue)} helperText={formik.touched.revenue && formik.errors.revenue} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {activeStep === 1 && (
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Financial Data</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Enter the financial figures (in INR). Leave blank if not available.
              </Typography>
              <Grid container spacing={3}>
                {[
                  { label: 'Total Assets', name: 'totalAssets' },
                  { label: 'Total Liabilities', name: 'totalLiabilities' },
                  { label: 'Current Assets', name: 'currentAssets' },
                  { label: 'Current Liabilities', name: 'currentLiabilities' },
                  { label: 'Inventory', name: 'inventory' },
                  { label: 'Receivables', name: 'receivables' },
                  { label: 'Payables', name: 'payables' },
                  { label: 'Total Debt', name: 'totalDebt' },
                  { label: 'Equity', name: 'equity' },
                  { label: 'Interest Expense', name: 'interestExpense' },
                  { label: 'EBIT', name: 'ebit' },
                  { label: 'Cost of Goods Sold', name: 'cogs' },
                ].map((field) => (
                  <Grid item xs={12} sm={6} md={4} key={field.name}>
                    <TextField
                      fullWidth
                      label={field.label}
                      name={field.name}
                      type="number"
                      value={formik.values[field.name]}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        )}

        {activeStep === 2 && (
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Review & Submit</Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary">Company Name</Typography>
                  <Typography variant="body1" fontWeight={500}>{formik.values.name || '-'}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary">Industry</Typography>
                  <Typography variant="body1" fontWeight={500}>{formik.values.industry || '-'}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary">CIN</Typography>
                  <Typography variant="body1" fontWeight={500}>{formik.values.cin || '-'}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary">Revenue</Typography>
                  <Typography variant="body1" fontWeight={500}>{formik.values.revenue ? `INR ${Number(formik.values.revenue).toLocaleString('en-IN')}` : '-'}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button disabled={activeStep === 0} onClick={() => setActiveStep((s) => s - 1)}>
            Back
          </Button>
          {activeStep < steps.length - 1 ? (
            <Button variant="contained" onClick={handleNext}>Next</Button>
          ) : (
            <Button variant="contained" type="submit" startIcon={<Save />}>
              Create Company
            </Button>
          )}
        </Box>
      </form>
    </motion.div>
  );
};

export default CompanyCreate;
