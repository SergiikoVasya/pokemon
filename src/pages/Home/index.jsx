import React, { useEffect, useState } from "react";
import "../../App.css";
import "./Home.css";
import { Pagination } from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function Home() {
  const [pokemons, setPokemons] = useState();
  useEffect(() => {
    const fetchCountryData = async (offset, limit) => {
      try {
        const result = await axios({
          method: "GET",
          url: "https://pokeapi.co/api/v2/pokemon",
          params: {
            offset: offset || 0,
            limit: limit || 20,
          },
        });

        const { results } = result.data;

        const additionalData = [];

        for (const pokemon of results) {
          const response = await axios.get(pokemon.url);
          additionalData.push(response.data);
        }

        setPokemons(additionalData);
      } catch (error) {
        setPokemons("Error");
      }
    };

    fetchCountryData(0, 20);
  }, []);
  if (!pokemons) {
    return <div></div>;
  }
  console.log(pokemons);
  return (
    <>
      <div className="pokemons_container">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Photo</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Attack</StyledTableCell>
                <StyledTableCell align="center">Defence</StyledTableCell>
                <StyledTableCell align="center">Speed</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pokemons.map((item) => (
                <StyledTableRow key={item.name}>
                  <StyledTableCell component="th" scope="row">
                    {item.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.stats[0].base_stat}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.stats[1].base_stat}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.stats[2].base_stat}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.stats[5].base_stat}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Pagination count={10} variant="outlined" color="primary" />
    </>
  );
}

export default Home;
