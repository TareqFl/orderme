import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { open_Buyer_pro } from "../../Actions";
import { useDispatch, useSelector } from "react-redux";
const BuyersProtection = () => {
  const dispatch = useDispatch();
  const { Protection } = useSelector((state) => state);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: {
      xs: 200,
      sm: 300,
      md: 600,
    },
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflowY: "auto",
  };

  //   Handlers
  function handleClose() {
    dispatch(open_Buyer_pro(false));
  }
  return (
    <Modal
      open={Protection}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          textAlign="center"
        >
          Buyers Protection Notice
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id lacus
          elementum, scelerisque ipsum ut, elementum neque. Sed et ante et velit
          porta efficitur eu vel purus. Suspendisse viverra sapien urna, in
          facilisis nisl cursus eget. Nulla aliquet cursus lectus et aliquet.
          Nunc eleifend ipsum nulla, venenatis bibendum mauris cursus posuere.
          Nullam id magna nec leo dapibus pellentesque. Integer rutrum gravida
          nunc, ultricies posuere erat congue eget. Quisque interdum augue sit
          amet lectus pellentesque, a aliquet mi rhoncus. Proin nec commodo
          diam. Ut vel pulvinar dui, ut sollicitudin urna. Aliquam in faucibus
          nunc, ut interdum mauris. Praesent luctus sapien nec est mattis
          consequat. Nulla massa ipsum, lobortis et nisl vitae, eleifend porta
          lacus. Praesent eleifend dapibus quam, nec accumsan dolor. Sed
          tincidunt risus in faucibus varius. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Suspendisse odio lorem, ultricies eu
          interdum eu, vestibulum sed nibh. Curabitur dictum porttitor placerat.
          Mauris libero metus, gravida quis congue at, aliquam vel dui. Aliquam
          vitae ullamcorper quam. Aliquam maximus congue accumsan. Maecenas ac
          ligula arcu. Pellentesque dignissim laoreet justo sit amet auctor.
          Donec convallis ante ac odio scelerisque, et eleifend velit vulputate.
          In diam nibh, tristique nec lacus a, pretium luctus turpis. Vestibulum
          tempus lectus at tortor semper, eu iaculis libero imperdiet.
          Suspendisse laoreet commodo lacus gravida mattis. Nam nisl lorem,
          elementum a sapien vitae, ornare molestie odio. Cras mollis quam sed
          quam tincidunt, nec sodales sapien fermentum. Proin varius tellus ut
          nulla imperdiet pellentesque. Ut maximus at lacus ut tempor. Aliquam
          tempor enim quis lacus ultrices, nec ultrices nisl congue. Phasellus
          at fringilla augue, at venenatis arcu. Mauris at risus a nulla
          scelerisque porta. Phasellus id ultrices lacus, sit amet facilisis
          eros. Cras elit orci, ullamcorper convallis velit eget, porta
          ultricies est. Vestibulum ante ipsum primis in faucibus orci luctus et
          ultrices posuere cubilia curae; Ut vestibulum rutrum pellentesque.
          Aliquam erat volutpat. Duis ut leo a quam aliquam pulvinar.
          Pellentesque tincidunt ipsum turpis, et fringilla nunc ultrices in.
          Sed volutpat viverra justo, sed iaculis orci blandit sed. Aenean purus
          magna, luctus a ultrices non, feugiat eget augue. Pellentesque finibus
          eros sed nisi sollicitudin vulputate. Aliquam eu massa aliquet,
          vulputate lacus congue, condimentum lectus. Nam nibh odio, egestas eu
          diam at, bibendum ultrices odio. Proin vitae finibus ante, venenatis
          fringilla massa. Etiam sit amet ornare leo, sit amet lacinia eros.
          Donec sagittis ac nisi at faucibus. Mauris sed diam in nisl pretium
          molestie. Phasellus euismod eleifend mattis. In posuere lorem justo,
          vitae posuere ligula imperdiet quis. Donec varius felis vel turpis
          pharetra sollicitudin non a dolor. Donec consectetur in sapien quis
          vehicula. Proin dapibus, mauris ac volutpat condimentum, orci sem
          congue orci, quis posuere nisl nunc dictum augue. Nunc iaculis vitae
          massa a efficitur. Fusce sed vestibulum purus, a interdum lacus. Donec
          ullamcorper sodales dignissim. Cras rutrum fringilla dolor, suscipit
          suscipit mauris fringilla eget.
        </Typography>
      </Box>
    </Modal>
  );
};

export default BuyersProtection;
