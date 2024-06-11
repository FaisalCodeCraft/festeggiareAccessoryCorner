import React from "react";
import styled from "@emotion/styled";
import {
  Box,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { COLORS } from "constants/contents/color";
import { getUserMessages } from "services/userMessage";
import { AuthContext } from "context/authContext";
import MessageModal from "./MessageModal/MessageModal";

const TableRowStyled = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: lightgray;
  }
  &:nth-of-type(even) {
    background-color: white;
  }
  & > td {
    color: white;
  }
`;

const MessageTable = () => {
  const [message, setMessage] = React.useState([]);
  const { user } = React.useContext(AuthContext);
  const [userId, setUserId] = React.useState<null>();
  const [messageModal, setMessageModal] = React.useState(false);

  React.useEffect(() => {
    getUserMessages(setMessage, user);
  }, [message, setMessage, user]);

  return (
    <div>
      <Paper elevation={4}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">User Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {message?.map((item: any, i: any) => (
                <TableRowStyled key={i} hover>
                  <TableCell
                    align="left"
                    sx={{ display: "flex", gap: 1, alignItems: "center" }}
                  >
                    {item?.UserName}
                  </TableCell>
                  <TableCell align="left">{item?.email}</TableCell>
                  <TableCell align="left">
                    {item?.UserMessage.slice(0, 30)}
                    <Box
                     onClick={()=>{
                        setMessageModal(true)
                        setUserId(item?.id)
                     }}
                     href="#" component={"a"}>
                      ...
                    </Box>
                  </TableCell>
                  {messageModal && userId === item?.id && (
                    <MessageModal
                      messageModal={messageModal}
                      userMessage={item}
                      onClose={() => setMessageModal(false)}
                    />
                  )}
                </TableRowStyled>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default MessageTable;
