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
            description: 'Interpreted, high-level Prosciutto pizza',
            image: '/images/pizza-prosciutto.jpg'
        },
        {
            id: 'javarita',
            name: 'Javarita',
            description: 'Statically typed and cheesy-compiled, not a simple Margarita',
            image: '/images/pizza-margherita.jpg'
        },
        {
            id: 'c++bonara',
            name: 'C++bonara',
            description: 'The classic and performant fast-food Carbonara',
            image: '/images/pizza-carbonara.jpg'
        },
        {
            id: 'diavolajs',
            name: 'DiavolaJS',
            description: 'For the adventurous, non-blockers, a real Diavola',
            image: '/images/pizza-diavola.jpg'
        }
    ]
};

export default CONSTANTS;
