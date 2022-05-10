import React, {useEffect,useState} from 'react';
import axios from 'axios';
import Link from 'next/link';
import {useForm} from 'react-hook-form';
import Preloader from '../components/Preloader';


export default function Home()
{

  const [loading, setLoading] = useState(false);
  let [news, setNews] = useState([]);
  const { register, handleSubmit, watch } = useForm();
  

  let getSelectedNews =
      async() =>{
                    try
                     { //console.log(`The value is `+Object.values(data));//The value is [object Object]

                      let category_value = watch("news_categories");

                       await axios.get(`https://saurav.tech/NewsAPI/top-headlines/category/${category_value}/in.json`)
                       .then((response) =>{
                                             //console.log(`${category_value}`);
                                              setNews(response.data.articles);
                                              setLoading(true);
                                          }
                            )
                        .catch((error)=> {
                                            console.log(error);
                                          }
                              )

                    } catch (e)
                      {
                          console.log(`The error while fetching api data`+e);

                      }
                }

                let getNews =
                    async() =>{

                                  try
                                   {

                                     await axios.get(`https://saurav.tech/NewsAPI/top-headlines/category/general/in.json`)
                                     .then((response) =>{
                                                            //console.log(response);
                                                            setNews(response.data.articles);
                                                            setLoading(true);
                                                        }
                                          )
                                      .catch((error)=> {
                                                          console.log(error);
                                                          if(error.response.status)
                                                            alert(`Per Day Usage Limit Exceeded, Try Other News Platform`);
                                                        }
                                            )

                                  } catch (e)
                                    {
                                        console.log(`The error while fetching api data`+e);

                                    }
                              }

  useEffect( ()=>{
                      getNews();

                 },[]);


  return (<>

  <section className="text-gray-600 body-font bg-gray-300">
    <div className="flex flex-row-reverse">
     <div className="form-control mt-24 mr-40 w-64">
      <form onSubmit={handleSubmit(getSelectedNews)} className="flex flex-row space-x-3">
        <select name="news_categories" defaultValue={'DEFAULT'} {...register("news_categories")} className="select select-primary w-full max-w-xs selectCategory">
          <option value="DEFAULT" disabled >Select the News Category</option>
          <option value="general">General</option>
          <option value="business">Business</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
          <option value="entertainment">Entertainment</option>
          <option value="science">Science</option>
          <option value="health">Health</option>
        </select>
      <button className="btn btn-outline btn-primary" type="submit">Read It</button>
      </form>
    </div>
  </div>

      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
        {
          loading ?
        (  news.map((currentElement,index) =>{
                                              return(
                                                      <div className="p-4 md:w-1/3" key = {index}>
                                                       <div className="card w-96 h-full bg-indigo-100 shadow-lg shadow-indigo-300">
                                                        <figure className="px-10 pt-10 flex flex-col">
                                                          <img src={currentElement.urlToImage} alt="News articles" className="rounded-xl mb-2" />
                                                          <figcaption className="tracking-widest text-xs title-font font-medium text-white badge badge-primary badge-md">Source: {currentElement.source.name}</figcaption>
                                                        </figure>
                                                        <div className="card-body ">
                                                          <h2 className="card-title text-lg font-bold text-gray-900" style={{fontFamily: "'Montserrat', sans-serif"}}>{currentElement.title}</h2>
                                                          <p>{currentElement.description}</p>
                                                          <div className="grid grid-cols-2">
                                                            <Link href={currentElement.url}>
                                                              <a className="link link-primary link-hover inline-flex items-center md:mb-2 lg:mb-0" target="_blank">Learn More ➜</a>
                                                            </Link>
                                                            <span>{currentElement.publishedAt}</span>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    );
                                            }
                  )
          ):(<Preloader />)
        }

        </div>
      </div>
    </section>

          </>)
}
