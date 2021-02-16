/* 
 * Instead of retrieving pizza information from public endpoint on backend all the
 * time let's use a easier approach for demo purposes and keep all the pizza information
 * within the app
 */
const CONSTANTS = {
    Pizzas: [ 
        {
            id: 'pythonciutto',
            name: 'Pythonciutto',
            description: 'For the adventurous, strongly typed Prosciutto pizza withcsdcsdcs d s cd scds ',
            image: '/images/pizza-prosciutto.jpg'
        },
        {
            id: 'javarita',
            name: 'Javarita',
            description: 'Not a simple margarita strongly cheese typed cdjsc jdsn',
            image: '/images/pizza-margherita.jpg'
        },
        {
            id: 'c++bonara',
            name: 'C++bonara',
            description: 'For the classic, strongly cheese typedcshdbsbd  cjsdhs ',
            image: '/images/pizza-carbonara.jpg'
        },
        {
            id: 'diavolajs',
            name: 'DiavolaJS',
            description: 'For the adventurous and curious, a diavola',
            image: '/images/pizza-diavola.jpg'
        }
    ]
};

export default CONSTANTS;
