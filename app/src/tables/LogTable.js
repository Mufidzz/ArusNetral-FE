import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(jam, tegangan, arus) {
    return { jam, tegangan, arus };
}

const rows = [
    createData('15:00:09', 220, 6.0),
    createData('15:00:09', 220, 9.0),
    createData('15:00:09', 220, 16.0),
    createData('15:00:09', 220, 3.7),
    createData('15:00:09', 220, 16.0),
    createData('15:00:09', 220, 16.0),
    createData('15:00:09', 220, 16.0),
    createData('15:00:09', 220, 16.0),
    createData('15:00:09', 220, 16.0),
    createData('15:00:09', 220, 16.0),
    createData('15:00:09', 220, 16.0),
    createData('15:00:09', 220, 16.0),
    createData('15:00:09', 220, 16.0),
    createData('15:00:09', 220, 16.0),
];

const useStyles = makeStyles({
    table: {
        minWidth: "100%",
    },
});

const LogTable = () => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Jam</StyledTableCell>
                        <StyledTableCell align={"center"}>Tegangan (V)</StyledTableCell>
                        <StyledTableCell align={"center"}>Arus (A)</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.jam}>
                            <StyledTableCell >
                                {row.jam}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.tegangan}</StyledTableCell>
                            <StyledTableCell align="center">{row.arus}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default LogTable