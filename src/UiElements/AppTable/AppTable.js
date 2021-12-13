import React, { useState } from "react";
import {
  Add,
  Delete,
  DocumentScanner,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Upgrade,
} from "@mui/icons-material";
import {
  CircularProgress,
  Collapse,
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
  collapsable,
  collapsedContent,
}) {
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [open, setOpen] = useState(undefined);

  return !loading ? (
    <TableContainer className="h-100">
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {collapsable && <TableCell />}
            {onSelected && <TableCell>Add</TableCell>}
            {headerCells &&
              headerCells.map((name, index) => (
                <TableCell key={index}>{name}</TableCell>
              ))}
            {onShow && <TableCell>Show</TableCell>}
            {onEdit && <TableCell>Edit</TableCell>}
            {onUpdate && <TableCell>Clone</TableCell>}
            {onDelete && <TableCell>Delete</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {collection &&
            collection?.map((item) => (
              <React.Fragment key={item._id}>
                <TableRow
                  sx={selections ? { backgroundColor: "lightgreen" } : {}}
                  hover={selections ? false : true}
                >
                  {collapsable && (
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(open ? undefined : item)}
                      >
                        {open === item ? (
                          <KeyboardArrowUp />
                        ) : (
                          <KeyboardArrowDown />
                        )}
                      </IconButton>
                    </TableCell>
                  )}
                  {onSelected && (
                    <TableCell>
                      <IconButton onClick={() => onSelected(item)}>
                        <Add />
                      </IconButton>
                    </TableCell>
                  )}
                  {bodyCells &&
                    bodyCells.map((cell, index) => (
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
                {collapsable && (
                  <TableRow>
                    <TableCell sx={{ p: 0, border: 0 }} colSpan={6}>
                      <Collapse in={open === item} timeout="auto" unmountOnExit>
                        {collapsedContent(open)}
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
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
