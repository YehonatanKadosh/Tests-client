import React, { useState } from "react";
import {
  Add,
  Delete,
  DocumentScanner,
  Edit,
  Upgrade,
} from "@mui/icons-material";
import {
  CircularProgress,
  Dialog,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function AppTable({
  onSelected,
  selections,
  collection,
  loading,
  headerCells,
  bodyCells,
  onShow,
  onEdit,
  onUpdate,
  onDelete,
}) {
  const [selectedItem, setSelectedItem] = useState(undefined);

  return !loading ? (
    <TableContainer className="h-100">
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {onSelected && <TableCell>Add</TableCell>}
            {headerCells.map((name, index) => (
              <TableCell key={index}>{name}</TableCell>
            ))}
            {onShow && <TableCell>Show</TableCell>}
            {onEdit && <TableCell>Edit</TableCell>}
            {onUpdate && <TableCell>Clone</TableCell>}
            {onDelete && <TableCell>Delete</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {collection?.map((item) => (
            <TableRow
              sx={selections ? { backgroundColor: "lightgreen" } : {}}
              key={item._id}
              hover={selections ? false : true}
            >
              {onSelected && (
                <TableCell>
                  <IconButton onClick={() => onSelected(item)}>
                    <Add />
                  </IconButton>
                </TableCell>
              )}
              {bodyCells.map((cell, index) => (
                <TableCell key={index}>
                  {typeof cell === "string" ? item[cell] : cell(item)}
                </TableCell>
              ))}
              {onShow && (
                <TableCell>
                  <IconButton onClick={() => setSelectedItem(onShow(item))}>
                    <DocumentScanner />
                  </IconButton>
                </TableCell>
              )}
              {onEdit && (
                <TableCell>
                  <IconButton
                    onClick={() =>
                      setSelectedItem(
                        onEdit(item, () => setSelectedItem(undefined))
                      )
                    }
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
              )}
              {onUpdate && (
                <TableCell>
                  <IconButton
                    onClick={() =>
                      setSelectedItem(
                        onUpdate(item, () => setSelectedItem(undefined))
                      )
                    }
                  >
                    <Upgrade />
                  </IconButton>
                </TableCell>
              )}
              {onDelete && (
                <TableCell>
                  <IconButton onClick={() => onDelete(item)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
        {selectedItem && (
          <Dialog
            onClose={() => setSelectedItem(undefined)}
            open={selectedItem ? true : false}
          >
            {selectedItem}
          </Dialog>
        )}
      </Table>
    </TableContainer>
  ) : (
    <CircularProgress />
  );
}

export default AppTable;
