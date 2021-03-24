import * as React from 'react';
import styles from './ProfileCard.module.scss';
import { IProfileCardProps } from './IProfileCardProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jQuery from "jquery";
import { ClassProfileCard } from "./ClassProfileCard";
import { IProfileCard } from "./IProfileCard";
import { Web } from "sp-pnp-js";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: '100%',
//     },
//     heading: {
//       fontSize: theme.typography.pxToRem(15),
//       fontWeight: theme.typography.fontWeightRegular,
//     },
//   }),
// );

export default class ProfileCard extends React.Component<IProfileCardProps, any> {
  public constructor(props: IProfileCardProps, any) {
    super(props);
    this.state = {
      items: [],
    };
  }
  public render(): React.ReactElement<IProfileCardProps, any> {
    // const classes = useStyles();
    jQuery("#workbenchPageContent").prop("style", "max-width: none"); jQuery(".SPCanvas-canvas").prop("style", "max-width: none"); jQuery(".CanvasZone").prop("style", "max-width: none");
    return (
  <div className={styles.CardBox}>
    <div style={{width:"100%", height:"5rem"}}>
    <div style={{color:"#00005b", fontSize:"3rem"}}>Executive Members</div>
    </div>
  
  <div className={styles.grid}> 
  {
  this.state.items.map(function (item: IProfileCard) {
          return (
    <div className={styles.card}>
      <img src={item.Picture} alt="profile-pic" className={styles.profile} />
      <h1 className={styles.title}>{item.Name}</h1>
      <p className={styles.jtitle}>{item.Role}</p>
      <div className={styles.desc}>
     
        
      </div>
      <Accordion className={styles.btn}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography >Profile</Typography>
        </AccordionSummary>
        <AccordionDetails style={{background: "white"}}>
          <Typography>
          {item.Description}
          </Typography>
        </AccordionDetails>
      </Accordion>
</div>
          )
  })
  }
</div>
</div>



    );
  }
  public componentDidMount() {
    // debugger;
    this._UsersList();
  }
  private _UsersList(): void {
    let web = new Web(this.props.context.pageContext.web.absoluteUrl);
    web.lists
      .getByTitle(`OurManagementTeam`)
      .items.get()
      .then((response) => {
        console.log(response);
        let UsersCollection = response.map((item) => new ClassProfileCard(item));
        let UsersCard = UsersCollection;
        this.setState({ items: UsersCard });
      });
  }
}
