import React, {useEffect, useState} from 'react';
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



const useStyles = makeStyles({
    table: {
        minWidth: "100%",
    },
});

const LogTable = props => {
    const classes = useStyles();
    const {data} = props;
    const [rows, setRows] = useState([])

    useEffect(() => {
        let tempRows = []
        if(data && data.length > 0) {
            data.map((data, i) => {
                tempRows.push(createData(data["Hour"] + ':00 - '+ data["Hour"] + ':59', data["AVGV"], data["AVGC"]));
            })
        }
        setRows(tempRows)

    }, [data])

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Jam</StyledTableCell>
                        <StyledTableCell align={"center"}>Tegangan Rata-Rata (V)</StyledTableCell>
                        <StyledTableCell align={"center"}>Arus Rata-Rata (A)</StyledTableCell>
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