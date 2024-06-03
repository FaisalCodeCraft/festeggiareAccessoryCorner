import React from "react";
import { Category, Search, Sort } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { CATEGORIES, SORT_FILTER } from "constants/contents/data";

const FilterProducts = (props:any) => {
  const {search,setSearch} = props
  console.log(search,'--')
  const [category, setCategory] = React.useState<string>("");

  return (
    <Box
      sx={{
        display: { md: "flex", sm: "flex", xs: "block" },
        justifyContent: "space-between",
        alignItems: "center",
        pb: 3,
      }}
    >
      <p>{category}</p>
      <Box>
        <TextField
          type="search"
          size="small"
          placeholder="Search Product... "
          value={search}
          onChange={({ target })=> setSearch(target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" component="div">
                <IconButton>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              borderRadius: "30px",
              bgcolor: "white",
              boxShadow: "inset 2px 2px 6px 1px lightGray",
            },
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mt: { md: 0, sm: 0, xs: 2 },
        }}
      >
        <TextField
          select
          defaultValue={"All Options"}
          onChange={(e) => setCategory(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" component="div">
                <IconButton>
                  <Sort />
                </IconButton>
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value={"All Options"}>Sort By</MenuItem>
          {SORT_FILTER?.map((sort: any, i: any) => (
            <MenuItem key={i} value={sort}>
              {sort}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          defaultValue={"All Options"}
          onChange={(e) => setCategory(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" component="div">
                <IconButton>
                  <Category />
                </IconButton>
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value={"All Options"}>Category</MenuItem>
          {CATEGORIES?.map((category: any, i: any) => (
            <MenuItem key={i} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
};

export default FilterProducts;
