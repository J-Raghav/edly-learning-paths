import {
  Checkbox,
  FormControl,
  InputLabel,
  LinearProgress,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getLearningPaths } from "../proxy-service";
import { getDerivedPropsLearningPath, productTypes } from "../utils";
import LearningPathHeader from "./Common/LearningPathHeader";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Home() {
  const [learningPaths, setLearningPath] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedProducts(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    if (!isLoading) {
      setLoading(true);
      getLearningPaths(selectedProducts).then((result) => {
        setLoading(false);
        setLearningPath(result);
      });
    }
  }, [selectedProducts]);

  return (
    <>
      <div className="container p-3 p-md-5">
        <LinearProgress className="mb-4 w-100" hidden={!isLoading} />
        <h1 className="h3 mb-3">Learning Paths</h1>
        <div className="row mb-3">
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="multiple-checkbox-label">Product Types</InputLabel>
            <Select
              labelId="multiple-checkbox-label"
              id="multiple-checkbox"
              multiple
              value={selectedProducts}
              onChange={handleChange}
              input={<OutlinedInput label="Product Types" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {productTypes?.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={selectedProducts.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="">
          {learningPaths?.map((learningPath) => {
            const headerProps = getDerivedPropsLearningPath(learningPath);
            return (
              <Box key={learningPath.uid} className="mb-4">
                <NavLink
                  className="text-decoration-none"
                  to={`/learningPath/${learningPath.uid}`}
                >
                  <LearningPathHeader
                    sx={{
                      ":hover": {
                        boxShadow: "0 .5rem 1rem rgba(0, 0, 0, .15);",
                      },
                    }}
                    learningPath={learningPath}
                    className="align-items-center h-100 border p-4"
                    titleSize="h2"
                    hideSummary={true}
                    {...headerProps}
                  />
                </NavLink>
              </Box>
            );
          })}
        </div>
      </div>
    </>
  );
}
