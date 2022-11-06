import styled from "styled-components/native";

export const HomeContainer = styled.View`
  display: flex;
  flex: 1;
  background-color: #fefcff;
`;

export const BackgroundImage = styled.ImageBackground`
  width: 100%;
  height: 300px;
`;

export const BackgroundContainer = styled.View`
  padding: 10px;
  height: 100%;
`;

export const NavbarSection = styled.View`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

export const MyntraLogo = styled.Image`
  width: 150px;
  height: 100px;
`;

export const WelcomeContainer = styled.View`
  margin-top: 32px;
  line-height: 84px;
`;

export const WelcomeText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: #858585;
`;

export const InfluencerHeader = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 44px;
  color: #89023e;
`;

// export const SessionContainer = styled.View`
//   width: 100%;
//   margin-top: -10px;
//   height: 100vh;
//   padding: 10px;
//   background: #fefcff;
//   box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.11);
//   border-radius: 20px 20px 0px 0px;
// `;

// export const TabsContainer = styled.View`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 33.5px;
// `;

// export const TabItem = styled.Text`
//   font-family: "Archivo";
//   font-style: normal;
//   font-weight: 600;
//   font-size: 16px;
//   line-height: 17px;
//   color: ${(props) => (props.selected ? "#cc7178" : "#858585")};
//   text-decoration: ${(props) => (props.selected ? "underline" : "")};
//   text-decoration-color: ${(props) => (props.selected ? "#cc7178" : "")};
//   text-underline-offset: 16px;
// `;
