import React, { useEffect, useState } from 'react';
import './available-meals-module.css';
import Card from '../UI/Card';
import MealItem from '../Meals/MealItem/MealItem';

/* const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99,
    },
    {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: 16.5,
    },
    {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99,
    },
    {
        id: 'm4',
        name: 'Green Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
    },
]; */

const DUMMY_MEALS = []

const AvailableMeals = () => {
    const [ meals, setMeals ] = useState([]);
    const [ loading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        fetchMeals().catch( (error) => {
            setIsLoading(false);
            setError(error.message)
        })
        
    },[]);

    const fetchMeals = async () => {
        setIsLoading(true);
        const data = await fetch('string para meals');
        if(!data.ok){
            throw new Error('Something went wrong, try again later')
        }
        const result = await data.json();
        //console.log(result, 'datos desde backend');
        const loadedMeals = [];
        for( const meal in result ){
            loadedMeals.push({
                id: meal,
                name: result[meal].name,
                description: result[meal].description,
                price: result[meal].price
            })
        }
        setMeals(loadedMeals)
        setIsLoading(false);
    }

    if( loading ){
        return(
            <section className='mealsLoading'>
                <p>Loading...</p>
            </section>
        )
    }

    if( error ){
        return(
            <section className='errorMeals'>
                <p>{error}</p>
            </section>
        )
    }

    const mealsList = meals.map( (meal) => <MealItem key={meal.id} meal={meal} /> )

    return(

        <>
            <section className='meals'>
                <Card>
                    <ul>
                        { 
                            mealsList
                        }
                    </ul>
                </Card>
            </section>
        </>
    )
}

export default AvailableMeals;