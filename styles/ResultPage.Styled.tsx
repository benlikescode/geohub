import styled from 'styled-components'

const StyledResultPage = styled.div`
 main {
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
 }

 .errorContainer {
   display: flex;
   justify-content: space-between;
   width: 100%;
   padding: 10rem;
 }

 .errorContent {
   margin-top: 3rem;
 }

 .errorPageTitle {
   font-size: 60px;
   margin-bottom: 2rem;
 }

 .errorPageMsg {
    display: block;
    color: var(--color2);
    font-size: 22px;
    font-weight: 400;

 }
`

export default StyledResultPage
