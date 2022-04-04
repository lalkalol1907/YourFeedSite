module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/flowbite/**/*.js"
    ],
    theme: {
        extend: {
            colors: {
                'liked-bg': '#ffb9b9',
                'liked-svg': '#ff4e4e',
                'navbar-color': '#feeeff',
                'bottom-icon-color': '#bababa',
                'bottom-icon-border-color': '#e0e0e0',
                'bottom-icon-bg-color': '#fefefe',
                'main-pink': '#c333ff'
            },
            height: {
                '128': '32rem'
            }
        },
    },
    plugins: [
        require('flowbite/plugin')
    ],
}