import './App.css';
import { useEffect, useState } from 'react';
import getDataFromApi from './https/axios';
import { formatNumber, funcSortbyKey } from './helper/functions';
import NoData from './pages/NotFound';
import ModalDetailCountries from './pages/Modal/Modal';
import LoadingSpinner from './pages/Loading/Loading';

function App() {

  const [state, setState] = useState({countries: [], dataModal: null, isLoading: false});

  useEffect(()=>{
    getData();
  },[])

  const getData = async () => {
    setState(prev=>({...prev, isLoading: true, countries: []}))
    await getDataFromApi('get','https://api.covid19api.com/summary').then(res=>{
      if(res?.data?.Countries){
        setState(prev=>({...prev, countries: res?.data?.Countries, isLoading: false}))
      }else{
        setState(prev=>({...prev, isLoading: false, countries: []}))
      }
    }).catch(err=>{
      setState(prev=>({...prev, isLoading: false, countries: []}))
    });

  };

  //sort total confirmed case
  const handleSortConfirmedCase = (type) => {
    if(type == 'up'){
      document.getElementById('confirm-down').classList.add('hide')
      document.getElementById('confirm-up').classList.remove('hide')
      
    }else{
      document.getElementById('confirm-down').classList.remove('hide')
      document.getElementById('confirm-up').classList.add('hide')
    }
    
    let arrSortTemp = funcSortbyKey(state?.countries,'TotalConfirmed', type);
    
    return setState(prev=>({...prev, countries: arrSortTemp}))
  };

  //sort total death case
  const handleSortDeathsCase = (type) => {
    if(type == 'up'){
      document.getElementById('deaths-down').classList.add('hide')
      document.getElementById('deaths-up').classList.remove('hide')
      
    }else{
      document.getElementById('deaths-down').classList.remove('hide')
      document.getElementById('deaths-up').classList.add('hide')
    }
    
    let arrSortTemp = funcSortbyKey(state?.countries,'TotalDeaths', type);
    
    return setState(prev=>({...prev, countries: arrSortTemp}))
  };

  //sort total recovered case
  const handleSortRecoveredCase = (type) => {
    if(type == 'up'){
      document.getElementById('recovered-down').classList.add('hide')
      document.getElementById('recovered-up').classList.remove('hide')
      
    }else{
      document.getElementById('recovered-down').classList.remove('hide')
      document.getElementById('recovered-up').classList.add('hide')
    }
    
    let arrSortTemp = funcSortbyKey(state?.countries,'TotalRecovered', type);
    
    return setState(prev=>({...prev, countries: arrSortTemp}))
  }

  const handleOpenModalDetail = (data) => {
    if(data){
      document.getElementById(`modaControutrieslDetail`).style.display = "block";
      setState(prev=>({...prev, dataModal: data}));
    }else{
      return;
    }
  };
 

  return (
    <div className="App">
      {
        state?.isLoading ? <LoadingSpinner/> 
        :
        <>
        
          <table className='table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th> 
                    <div className='wrapper-head-table'> 
                      <span> Total confirmed cases</span> 
                      <div className='wrapper-head-table_icon'>
                        <div id="confirm-up" onClick={(e)=>{e.preventDefault(); handleSortConfirmedCase('up')}} className=" cursor-pnt">
                          <img src="./svg-icon/up-arrow.svg" className='size-icon-16'/> 
                        </div>
                        <div id="confirm-down" onClick={(e)=>{e.preventDefault(); handleSortConfirmedCase('down')}} className=" cursor-pnt">
                          <img src="./svg-icon/down-arrow.svg" className='size-icon-16'/> 
                        </div>
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className='wrapper-head-table'> 
                      <span>Number of deaths</span> 
                      <div className='wrapper-head-table_icon'>
                        <div id="deaths-up" onClick={(e)=>{e.preventDefault(); handleSortDeathsCase('up')}} className=" cursor-pnt">
                          <img src="./svg-icon/up-arrow.svg" className='size-icon-16'/> 
                        </div>
                        <div id="deaths-down" onClick={(e)=>{e.preventDefault(); handleSortDeathsCase('down')}} className=" cursor-pnt">
                          <img src="./svg-icon/down-arrow.svg" className='size-icon-16'/> 
                        </div>
                      </div>
                    </div>
                  </th>
                  <th>
                  <div className='wrapper-head-table'> 
                      <span>Number of recovered cases</span> 
                      <div className='wrapper-head-table_icon'>
                        <div id="recovered-up" onClick={(e)=>{e.preventDefault(); handleSortRecoveredCase('up')}} className=" cursor-pnt">
                          <img src="./svg-icon/up-arrow.svg" className='size-icon-16'/> 
                        </div>
                        <div id="recovered-down" onClick={(e)=>{e.preventDefault(); handleSortRecoveredCase('down')}} className=" cursor-pnt">
                          <img src="./svg-icon/down-arrow.svg" className='size-icon-16'/> 
                        </div>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  !state?.countries.length ? <tr> <td className='txt-center' colSpan={4}><NoData/></td> </tr> : 
                  
                  state?.countries.map((item, index)=>{
                    return <tr key={index}>
                      <td> <div id={`btnModal-${item?.CountryCode}`} className='txt-center' onClick={(e)=>{handleOpenModalDetail(item)}}>{item?.Country}</div></td>
                      <td> <div className='txt-right'>{formatNumber(item?.TotalConfirmed)}</div></td>
                      <td> <div className='txt-right'>{formatNumber(item?.TotalDeaths)}</div></td>
                      <td> <div className='txt-right'>{formatNumber(item?.TotalRecovered)}</div></td>
                    </tr>
                  })
                }
              </tbody>
          </table>
          <ModalDetailCountries data={state?.dataModal}/>
        </>
      }
    </div>
  );
}

export default App;
