import React, { useEffect, useState } from "react";
import PageTitleComponent from "../../components/PageTitleComponent";
import styled from "styled-components";
import { masterList } from "../../services/CustomerGroupService";
import { FormControl, TextField, Button } from "@mui/material";
import { DatePicker } from "@mui/lab";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";
import DateAdapter from "@mui/lab/AdapterMoment";
import { listAll } from "../../services/CustomerListView";
import { useForm } from "react-hook-form";
import { DATE_TIME_FORMAT } from "../../config/AppConfig";
import { DataGrid } from "@mui/x-data-grid";
import LoaderComponent from "../../components/LoaderComponent";
import SelectComponent from "../../components/SelectComponent";
import { Link } from "react-router-dom";
const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
     
    },
    { field: "legal_name", headerName: "State", minWidth: 150 },
    { field: "lastvisit", headerName: "Last Visit", minWidth: 150 },
    { field: "mobile", headerName: "Mobile", minWidth: 150 },
    { field: "city", headerName: "City", minWidth: 150 },
    { field: "noofbills", headerName: "No of Bill", minWidth: 150 },
    { field: "totalpoint", headerName: "Total point", minWidth: 150 },
    { field: "status", headerName: "Status", minWidth: 150 },
  ];
  