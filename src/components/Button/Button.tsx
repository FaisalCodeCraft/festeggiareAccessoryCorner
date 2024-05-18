import { Box, Button } from '@mui/material'
import { COLORS } from 'constants/contents/color'

const CommonButton = (props:any) => {
    const {title} = props
  return (
    <div>
      <Box>
          <Button sx={btnStyle}>{title}</Button>
        </Box>
    </div>
  )
}

export default CommonButton
const btnStyle = {
    color: COLORS.pink.hotPink,
    border: "1px solid rgb(238,44,130)",
    borderRadius: "40px",
    px: 3,
    fontSize: "small",
    "&:hover": { backgroundColor: COLORS.pink.hotPink, color: "white" },
  };
  