import React from "react";
import styled from "@emotion/styled";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getUserMessages } from "services/userMessage";
import { AuthContext } from "context/authContext";
import MessageModal from "../MessageModal/MessageModal";

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
    <Container maxWidth='lg'>
      <Paper elevation={4}>
        <TableContainer  sx={{ mt:5}}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">User Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {message?.map((item: any, i: any) => (
                <TableRowStyled
                  key={i}
                  hover
                  onClick={() => {
                    setMessageModal(!messageModal);
                    setUserId(item?.id);
                  }}
                >
                  <TableCell
                    align="center"
                  >
                    {item?.UserName}
                  </TableCell>
                  <TableCell align="left">{item?.email}</TableCell>
                  <TableCell align="left">
                    {item?.UserMessage.slice(0, 30)}
                    <Box href="#" component={"a"}>
                      ...
                    </Box>
                  </TableCell>
                  {messageModal && userId === item?.id && (
                    <MessageModal
                      messageModal={messageModal}
                      userMessage={item}
                      onClose={() => setMessageModal(!messageModal)}
                    />
                  )}
                </TableRowStyled>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default MessageTable;
