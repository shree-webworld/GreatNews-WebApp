import React, {useEffect,useState} from 'react';
import axios from 'axios';
import Link from 'next/link';
import {useForm} from 'react-hook-form';
import Preloader from '../components/Preloader';

export default function google_news()
{

  let [news, setNews] = useState([]);
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  let getSelectedNews =
      async(data) =>{
                    try
                     { //console.log(`The value is `+Object.values(data));//The value is [object Object]
                      let category_value = Object.values(data);
                      let GNEWSKEY2 = process.env.NEXT_PUBLIC_GNEWSKEY2;

                       await axios.get(`https://gnews.io/api/v4/search?q=${category_value[1]}&lang=${category_value[0]}&token=${GNEWSKEY2}`)
                       .then((response) =>{
                                              // console.log(`${category_value[0]} and ${category_value[1]}`);
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
                                   { let GNEWSKEY1 = process.env.NEXT_PUBLIC_GNEWSKEY1;
                                     await axios.get(`https://gnews.io/api/v4/top-headlines?lang=en&token=${GNEWSKEY1}`)
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
     <div className="form-control mt-24 mr-96 w-56">
      <form onSubmit={handleSubmit(getSelectedNews)} className="flex flex-row space-x-3">
        <select name="news_language" defaultValue={'DEFAULT'} {...register("news_language")} className="select select-primary w-full max-w-xs selectCategory">
          <option value="DEFAULT" disabled >Select the News Language</option>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="mr">Marathi</option>
        </select>

      <select name="news_categories" defaultValue={'DEFAULT'} {...register("news_categories")} className="select select-primary w-full max-w-xs selectCategory">
        <option value="DEFAULT" disabled >Select the News Category</option>
        <option value="nation">Nation</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="world">World</option>
        <option value="politics">Politics</option>
        <option value="technology">Technology</option>
        <option value="entertainment">Entertainment</option>
        <option value="health">Health</option>
        <option value="science">Science</option>
        <option value="automobile">Automobile</option>
      </select>
      <button className="btn btn-outline btn-primary" type="submit">Read It</button>
    </form>
    </div>
  </div>


      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
        {
          loading ?
        ( news.map((currentElement,index) =>{
                                              return(
                                                      <div className="p-4 md:w-1/3" key = {index}>
                                                       <div className="card w-96 h-full bg-indigo-100 shadow-lg shadow-indigo-300">
                                                        <figure className="px-10 pt-10 flex flex-col">
                                                          <img src={currentElement.image} alt="News articles" className="rounded-xl mb-2" />
                                                          <figcaption className="tracking-widest text-xs title-font font-medium text-white badge badge-primary badge-md">Source: {currentElement.source.name}</figcaption>
                                                        </figure>
                                                        <div className="card-body ">
                                                          <h2 className="card-title text-lg font-bold text-gray-900" style={{fontFamily: "'Montserrat', sans-serif"}}>{currentElement.title}</h2>
                                                          <p>{currentElement.description}</p>
                                                          <div className="grid grid-cols-2">
                                                            <Link href={currentElement.source.url}>
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
            )  : (<Preloader />)
        }

        </div>
      </div>
    </section>

          </>)
}
