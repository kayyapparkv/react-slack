import React, { Component } from 'react';
import './App.css';
import firebase from '../firebaseConnection';
import moment from 'moment';

import { Grid, GridColumn, Header, Icon, Segment, Divider, GridRow, Row, Button, Table } from 'semantic-ui-react';
import { Events, animateScroll as scroll, scroller } from 'react-scroll';
import { Bar } from 'react-chartjs-2';
import ParticlesBgg from 'particles-bg';

import ReactTable, { useSortBy } from 'react-table';
import 'react-table/react-table.css';
import TopHeader from './TopHeader';
import logo from '../images/dvaraLogo.jpg';
import { connect } from 'react-redux';

import { setLoader } from '../actions';

class App extends Component {

  // constructor(props) {
  //   super(props);
  //   // this.inseminatorsTable = React.createRef();
  //   this.state = {
  //     sortOptions : [
  //       {
  //         id: 'Name',
  //         desc: false
  //       }
  //     ]
  //   }
  // }

  state = {
    labels: [],
    datasets: [],
    users: [],
    userDatasets: [],
    userDataSetsUser: "",
    table: false,
    sortOptions : [
      {
        id: 'Name',
        desc: false
      }
    ],
    selectedRows: [],
  }  

  componentDidMount() {
    try{
      firebase.database().ref('/').on("value", (snap) => {

        this.setState({
          labels: [],
          datasets: [],
          users: [],
          label: []
        });

        const data = snap.val();

        //deleting restrict user key from the object, as restrictUser is included in the normal array of inseminators
        delete data["restrictUser"];
        
        let dashBoardObj = {};
        let labelObject = {};
        for (let i = 0; i < 7; i++) {
          dashBoardObj[moment().subtract(i, "days").format('YYYYMMDD')] = 0;
          labelObject[moment().subtract(i, "days").format('DD-MM-YYYY')] = 0;
        }

        const keys = Object.keys(data);
        const dashBoardKeys = Object.keys(dashBoardObj);

        const userArray = [];

        let todayInsemination = 0, totalInsemination = 0, allInsemination = 0, noOfAits = 0;
        keys.forEach(key => {



          noOfAits += 1;

          const userDashBoardData = {};
          
          allInsemination = 0;

          dashBoardKeys.forEach(dashBoardKey => {
            if(('dashboard' in data[key])) {
              if(data[key].dashboard[dashBoardKey]) {
                dashBoardObj[dashBoardKey] = parseInt(dashBoardObj[dashBoardKey]) + parseInt(data[key].dashboard[dashBoardKey]);
                userDashBoardData[dashBoardKey] = data[key].dashboard[dashBoardKey];
              } else {
                userDashBoardData[dashBoardKey] = 0;
              }
            }
           
          });
          let IteratorKeys = {};

          if(('dashboard' in data[key])) {

            IteratorKeys = Object.keys(data[key].dashboard);
            IteratorKeys.forEach(iteratorKey => {
              totalInsemination = parseInt(totalInsemination) + parseInt(data[key].dashboard[iteratorKey]);
              allInsemination = parseInt(allInsemination) + parseInt(data[key].dashboard[iteratorKey]);
            })


            todayInsemination = parseInt(todayInsemination) + parseInt(data[key].dashboard[moment().format('YYYYMMDD')] === undefined ? 0 : data[key].dashboard[moment().format('YYYYMMDD')]);

          }


          

          const obj ={};
          obj['RegNumber'] = data[key].regAndSemenDetails.regDetails['VCI_RegNumber'];
          obj['Name'] = data[key].regAndSemenDetails.regDetails['name'];
          obj['MobileNumber'] = key;
          obj['data'] = userDashBoardData;
          obj['totalInsemination'] = allInsemination;

          userArray.push(obj);


          
        });

        console.log (`todayInsemination: ${todayInsemination},
        totalInsemination: ${totalInsemination}`)

        this.props.setLoader({
          todayInsemination: todayInsemination,
          totalInsemination: totalInsemination,
          noOfAits: noOfAits,
        });

        const dashBoardArray = [];
        dashBoardKeys.forEach(dashBoardKey => {
          dashBoardArray.push(dashBoardObj[dashBoardKey]);
        })
        const stateDashBoardObj = {
          label: "INSEMINATION",
          backgroundColor: [
            '#28df99',
            '#28df99',
            '#28df99',
            '#28df99',
            '#28df99',
            '#28df99',
            '#28df99',
           ],
          borderColor: '#9a0000',
          hoverBorderColor: 'black',
          borderWidth: 2,
          data: dashBoardArray,
          barPercentage: 0.5
        }

        this.setState({
          labels: this.state.labels.concat(dashBoardKeys),
          label: this.state.labels.concat(Object.keys(labelObject).reverse()),
          datasets: this.state.datasets.concat( stateDashBoardObj),
          users: this.state.users.concat(userArray)
        })
        
      });
    } catch (err) {
      console.log(err);
    } 

    Events.scrollEvent.register('begin', function() {
      console.log('begin', arguments);
    });
    Events.scrollEvent.register('end', function() {
      console.log('end', arguments);
    });

  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  scrollTo() {
    scroller.scrollTo('grid-scroll', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuint'
    })
  }

  handleLogout = () => {
    firebase.auth().signOut().then (() => {
      console.log('signed out');
    })
  }

  onButtonClick = (rowInfo) => {
    console.log(rowInfo);
        console.log("row info",rowInfo._original);
        const dashBoardArray = [];
        this.state.labels.forEach(dashBoardKey => {
          dashBoardArray.push(rowInfo._original.data[dashBoardKey]);
        })
        console.log(dashBoardArray);
        const stateDashBoardObj = {
          label: "INSEMINATION",
          backgroundColor: [
            '#28df99',
            '#28df99',
            '#28df99',
            '#28df99',
            '#28df99',
            '#28df99',
            '#28df99',
           ],
          borderColor: '#9a0000',
          hoverBorderColor: 'black',
          borderWidth: 2,
          data: dashBoardArray,
          barPercentage: 0.5
        }

        this.setState({
          userDatasets: [stateDashBoardObj],
          userDataSetsUser: `${rowInfo._original.Name}'s Last 7 days Insemination`,
          table: false
        });

        // window.scrollTo(0, this.inseminatorsTable.current.offsetTop)

        // this.ref.scrollIntoView();


    this.scrollTo();

    
  
  }

  onRowClick = (state, rowInfo, column, instance) => {
    console.log('in onROwClick function');
      return {
        onClick: e => {
          // console.log('A Td Element was clicked!')
          // console.log('it produced this event:', e)
          // console.log('It was in this column:', column)
          // console.log('It was in this row:', rowInfo)
          // console.log('It was in this table instance:', instance)
          console.log("row info",rowInfo.original);
          const dashBoardArray = [];
          this.state.labels.forEach(dashBoardKey => {
            dashBoardArray.push(rowInfo.original.data[dashBoardKey]);
          })
          console.log(dashBoardArray);
          const stateDashBoardObj = {
            label: "INSEMINATION",
            backgroundColor: [
              // '#2ec1ac',
              // '#d2e603',
              // '#9d65c9',
              '#28df99',
              // '#ff414d',
              // '#1aa6b7',
              // '#e11d74'
             ],
            borderColor: '#9a0000',
            borderWidth: 2,
            data: dashBoardArray,
            barPercentage: 0.5
          }
  
          this.setState({
            userDatasets: [stateDashBoardObj],
            userDataSetsUser: `${rowInfo.original.Name}'s Last 7 days Insemination`,
            table: false
          });
  
          // window.scrollTo(0, this.inseminatorsTable.current.offsetTop)
  
          // this.ref.scrollIntoView();
        }
      }
    
      
  }

  filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id
    return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
  }



  render() {
    const columns = [
      {
        Header: 'Mobile Number',
        accessor: 'MobileNumber',
        filterople: true,
        headerStyle: {
          background:'#28df99',
          textAlign:'center',
          color: '#9a0000',
          borderRadius: '5px',
          padding: '5px',
          border:'1px solid #9a0000',
      },
      },
      {
        Header: 'Name',
        accessor: 'Name',
        filterable: true,
        headerStyle: {
          background:'#28df99',
          textAlign:'center',
          color: '#9a0000',
          borderRadius: '5px',
          padding: '5px',
          border:'1px solid #9a0000',
      },
      },
      {
        Header: 'Inseminations',
        accessor: 'totalInsemination',
        headerStyle: {
          background:'#28df99',
          textAlign:'center',
          color: '#9a0000',
          borderRadius: '5px',
          padding: '5px',
          border:'1px solid #9a0000',
      },
      },
      {
        Header: "Action",
        Cell: ({row}) => (
          <Button onClick = { () => this.onButtonClick(row)} style = {{background : '#28df99', color: '#9a0000'}}>
            Graph
          </Button>
        ),
        headerStyle: {
          background:'#28df99',
          textAlign:'center',
          color: '#9a0000',
          borderRadius: '5px',
          padding: '5px',
          border:'1px solid #9a0000',
        }
      }
    ];
    return (
      // <Grid textAlign = "center" verticalAlign = "middle">
      //   <GridColumn>
      //     <Header as = "h1" icon color = "green" textAlign = "center">
      //         last 7 days INSEMINATION DETAILS
      //     </Header>
      //     <Segment basic style ={{maxWidth: "50%"}} textAlign = "center" verticalAlign = "center">
      //     <Bar
      //     data={state}
      //     options={{
      //       title:{
      //         display:true,
      //         text:'Average Rainfall per month',
      //         fontSize:20
      //       },
      //       legend:{
      //         display:true,
      //         position:'right'
      //       }
      //     }}
      //   />
      //     </Segment>
      //   </GridColumn>
      // </Grid>

      <Grid padded className = "app-home">
        <TopHeader />
        <Grid.Row centered columns = {1}  relaxed = "very" stackable>
          <Grid.Column style = {{maxWidth: "50%", background: 'white'}}>
          <Bar
              data={
                {labels: this.state.label,
                datasets: this.state.datasets}
              }
              options={{
                title:{
                  display:true,
                  text:'Daily Inseminations: Last 7 days',
                  fontSize:20
                },
                legend:{
                  display:false,
                  position:'right'
                }
              }}
            />
            
          </Grid.Column>

          <Table style = {{position: 'absolute', right: '10%', top: '10%', width: 20}}>

                  <Table.Body className = 'tableContainer'>
                    <Table.Row>
                    <Table.Cell collapsing>
                      Total no. of AITs
                    </Table.Cell>
                    <Table.Cell>
                      {this.props.noOfAits}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell collapsing>
                      Today's Inseminations
                    </Table.Cell>
                    <Table.Cell>
                      {this.props.todayInsemination}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell collapsing>
                      Total Inseminations
                    </Table.Cell>
                    <Table.Cell>
                      {this.props.totalInsemination}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
        </Grid.Row >

        <Grid.Row centered columns = {1}  relaxed = "very" stackable style= {{'padding-top': '50px'}} >
          <h2>Inseminators Table</h2>
          <Grid.Column style = {{maxWidth: "50%", background: 'white', }}>
          <ReactTable 
                  columns = {columns}
                  data = {this.state.users}
                  noDataText = {"No Results ....."}
                  defaultPageSize = {10}
                  sorted = {this.state.sortOptions}
                  defaultFilterMethod = {this.filterMethod}
                  rowClassName = {this.setRowCLassName}
                >

                </ReactTable>
          </Grid.Column>
        </Grid.Row>

        <div name = 'grid-scroll'></div>
        {this.state.userDataSetsUser && <Grid.Row centered columns = {1}  relaxed = "very" stackable style= {{'padding-top': '50px'}} >
          <Grid.Column style = {{maxWidth: "50%", background: 'white'}}>
          <Bar
              data={
                {labels: this.state.label,
                datasets: this.state.userDatasets}
              }
              options={{
                title:{
                  display:true,
                  text:`${this.state.userDataSetsUser}`,
                  fontSize:20
                },
                legend:{
                  display:false,
                  position:'right'
                }
              }}
            />
          </Grid.Column>
            </Grid.Row> }

      </Grid>


      // <Grid>
      //   <TopHeader />
      //   <Segment placeholder style = {{witdh: "100%", height: "70%"}}>
      //     <Divider horizontal>INSEMINATION DETAILS</Divider>
      //     <Grid Row = {3} relaxed = "very" stackable textAlign = "center" verticalAlign = "middle" >
      //       <GridRow style = {{maxWidth: "50%"}}>
      //       <Bar
      //         data={
      //           {labels: this.state.label,
      //           datasets: this.state.datasets}
      //         }
      //         options={{
      //           title:{
      //             display:true,
      //             text:'Last 7 days',
      //             fontSize:20
      //           },
      //           legend:{
      //             display:false,
      //             position:'right'
      //           }
      //         }}
      //       />
      //       </GridRow>


      //       <GridRow style = {{maxWidth: "50%"}}>
      //           <ReactTable 
      //             columns = {columns}
      //             data = {this.state.users}
      //             noDataText = {"Please Wait ....."}
      //             defaultPageSize = {10}
      //             getTrProps = {this.onRowClick}
      //           >

      //           </ReactTable>
      //       </GridRow>



      //       <GridRow style = {{maxWidth: "50%"}}>
      //         <Bar
      //         data={
      //           {labels: this.state.label,
      //           datasets: this.state.userDatasets}
      //         }
      //         options={{
      //           title:{
      //             display:true,
      //             text:`${this.state.userDataSetsUser}`,
      //             fontSize:20
      //           },
      //           legend:{
      //             display:false,
      //             position:'right'
      //           }
      //         }}
      //       />
      //       </GridRow>

            
      //     </Grid>
      //   </Segment>
      // </Grid>
      
    );
  }
}

const mapStateFromProps = state => ({

  todayInsemination: state.loader.todayInsemination ? state.loader.todayInsemination : 0,
  totalInsemination: state.loader.totalInsemination ? state.loader.totalInsemination : 0,
  noOfAits: state.loader.noOfAits ? state.loader.noOfAits : 0,

});



export default connect(mapStateFromProps ,{setLoader})(App);
