import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Delete, DocumentScanner, Edit, Upgrade } from "@mui/icons-material";
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
  onClick,
  collectionSelector,
  loadingSelector,
  headerCells,
  bodyCells,
  onShow,
  onEdit,
  onUpdate,
  onDelete,
}) {
  const [selectedItem, setSelectedItem] = useState(undefined);
  const collection = useSelector(collectionSelector);
  const collectionLoading = useSelector(loadingSelector);

  return !collectionLoading ? (
    <TableContainer className="h-100">
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
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
              onClick={onClick ? () => onClick(item) : undefined}
              key={item._id}
              hover
            >
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
                  <IconButton onClick={() => setSelectedItem(onEdit(item))}>
                    <Edit />
                  </IconButton>
                </TableCell>
              )}
              {onUpdate && (
                <TableCell>
                  <IconButton onClick={() => setSelectedItem(onUpdate(item))}>
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
