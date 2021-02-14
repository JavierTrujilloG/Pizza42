import React from 'react';
import { Link } from 'react-router-dom';
import {
    Breadcrumbs,
    Typography,
} from '@material-ui/core';

const CustomBreadCrumb = ({ id } ) => (
    <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/home">
            Home
        </Link>
        <Typography color="textPrimary">{id}</Typography>
    </Breadcrumbs>
);

export default CustomBreadCrumb;
