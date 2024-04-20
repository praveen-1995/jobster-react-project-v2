import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { customFetch, getUserFromLocalStorage } from '../../utils';
import { getAllJobs, hideLoading, showLoading } from '../allJobs/allJobsSlice';
import { logoutUser } from '../user/userSlice';

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  status: 'pending',
  statusOptions: ['interview', 'declined', 'pending'],
  jobType: 'full-time',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  isEditing: false,
  editJobId: '',
};

export const createJob = createAsyncThunk(
  'job/createJob',
  async (job, thunkAPI) => {
    try {
      const response = await customFetch.post('/jobs', job, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().userState.user.token}`,
        },
      });
      thunkAPI.dispatch(clearInputs());
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue('Unauthorized! Logging out...');
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteJob = createAsyncThunk(
  'job/deleteJob',
  async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
      const response = await customFetch.delete(`/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().userState.user.token}`,
        },
      });
      thunkAPI.dispatch(getAllJobs());
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const editJob = createAsyncThunk(
  'job/editJob',
  async ({ jobId, job }, thunkAPI) => {
    try {
      const response = await customFetch.patch(`/jobs/${jobId}`, job, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().userState.user.token}`,
        },
      });
      thunkAPI.dispatch(clearInputs());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const jobSlice = createSlice({
  name: 'job',
  initialState: initialState,
  reducers: {
    updateInput: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    clearInputs: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      };
    },
    setEditJob: (state, action) => {
      const { payload } = action;
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Job successfully created!');
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(deleteJob.fulfilled, () => {
        toast.success('Job successfully deleted!');
      })
      .addCase(deleteJob.rejected, (state, action) => {
        toast.error(action.payload);
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Job successfully updated!');
      })
      .addCase(editJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});

export const { updateInput, clearInputs, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;
