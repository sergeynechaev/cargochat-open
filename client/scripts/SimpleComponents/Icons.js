var React = require('react/addons');

var Icon = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        size     : React.PropTypes.number,
        iconName : React.PropTypes.string.isRequired,
        onClick  : React.PropTypes.func,
        fill: React.PropTypes.string
    },

    getDefaultProps(){
        return {
            className: "icon-dark",
            size     : 24
        }
    },
    onClick(){
        var c = this.props.onClick;
        if (c) c()
    },


    render(){
        //console.log(this.props);
        switch (this.props.iconName) {
            // Old Icon
            case "tag-faces":
                return(
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         viewBox="0 0 24 24"
                         data-name={this.props.dataName}
                         onClick={this.onClick}
                        >
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                    </svg>
                )
                break;
            case "add":
                return(
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         viewBox="0 0 24 24"
                         data-name={this.props.dataName}
                         onClick={this.onClick}
                        >
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                )
                break;
            case "person-outline":
                return(
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         viewBox="0 0 24 24"
                         data-name={this.props.dataName}
                         onClick={this.onClick}
                         fill={this.props.fill}
                        >
                        <path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                )
                break;
            case "info-outline":
                return(
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         viewBox="0 0 24 24"
                         data-name={this.props.dataName}
                         onClick={this.onClick}
                         fill={this.props.fill}
                        >
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
                    </svg>
                )
                break;
            case "power settings new":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className={this.props.className}
                         viewBox="0 0 24 24"
                         width={this.props.size }
                         height={this.props.size }
                         data-name={this.props.dataName}
                        >
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path
                            d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
                    </svg>
                );
                break;
            case "arrow-left":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         viewBox="0 0 24 24"
                         data-name={this.props.dataName}
                        >
                        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/>
                    </svg>
                );
                break;
            case "arrow-right":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         viewBox="0 0 24 24"
                         data-name={this.props.dataName}
                        >
                        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                    </svg>
                );
                break;
            case "expand-less":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className={this.props.className}
                         viewBox="0 0 24 24"
                         width={this.props.size }
                         height={this.props.size }
                         data-name={this.props.dataName}
                        >
                        <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                );
                break;
            case "expand-more":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className={this.props.className}
                         viewBox="0 0 24 24"
                         width={this.props.size}
                         height={this.props.size}
                         data-name={this.props.dataName}
                        >
                        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                );
                break;
            case "select-down":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         data-name={this.props.dataName}
                        >
                        <path d="M7,10L12,15L17,10H7Z"/>
                    </svg>
                );
                break;
            case "select-up":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         data-name={this.props.dataName}
                        >
                        <path d="M7,15L12,10L17,15H7Z"/>
                    </svg>
                );
                break;
            case "minimize-window":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         data-name={this.props.dataName}
                        >
                        <path d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z" />
                    </svg>
                );
                break;
            case "event":
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className={this.props.className}
                        width={this.props.size }
                        height={this.props.size }
                        data-name={this.props.dataName}
                        >
                        <path
                            d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                );
                break;
            case "find-partners":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M13,13C11,13 7,14 7,16V18H19V16C19,14 15,13 13,13M19.62,13.16C20.45,13.88 21,14.82 21,16V18H24V16C24,14.46 21.63,13.5 19.62,13.16M13,11A3,3 0 0,0 16,8A3,3 0 0,0 13,5A3,3 0 0,0 10,8A3,3 0 0,0 13,11M18,11A3,3 0 0,0 21,8A3,3 0 0,0 18,5C17.68,5 17.37,5.05 17.08,5.14C17.65,5.95 18,6.94 18,8C18,9.06 17.65,10.04 17.08,10.85C17.37,10.95 17.68,11 18,11M8,10H5V7H3V10H0V12H3V15H5V12H8V10Z"/>
                    </svg>
                );
                break;
            case "company-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M14,6H10V4H14M20,6H16V4L14,2H10L8,4V6H4C2.89,6 2,6.89 2,8V19A2,2 0 0,0 4,21H20A2,2 0 0,0 22,19V8C22,6.89 21.1,6 20,6Z"/>
                    </svg>
                );
                break;
            case "search-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         data-name={this.props.dataName}
                         fill={this.props.fill}
                        >
                        <path
                            d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
                    </svg>
                );
                break;
            case "settings-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         data-name={this.props.dataName}
                         onClick={this.onClick}
                        >
                        <path
                            d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
                    </svg>
                );
                break;
            case "user-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         data-name={this.props.dataName}
                         fill={this.props.fill}
                        >
                        <path
                            d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                    </svg>
                );
                break;
            case "user-plus-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         data-name={this.props.dataName}
                         fill={this.props.fill}
                        >
                        <path d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z" />
                    </svg>
                );
                break;
            case "user-minus-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         data-name={this.props.dataName}
                        >
                        <path d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M1,10V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z" />
                    </svg>
                );
                break;
            case "user-remove-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         data-name={this.props.dataName}
                        >
                        <path d="M15,14C17.67,14 23,15.33 23,18V20H7V18C7,15.33 12.33,14 15,14M15,12A4,4 0 0,1 11,8A4,4 0 0,1 15,4A4,4 0 0,1 19,8A4,4 0 0,1 15,12M5,9.59L7.12,7.46L8.54,8.88L6.41,11L8.54,13.12L7.12,14.54L5,12.41L2.88,14.54L1.46,13.12L3.59,11L1.46,8.88L2.88,7.46L5,9.59Z" />
                    </svg>
                );
                break;
            case "dashboard-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         data-name={this.props.dataName}
                        >
                        <path d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z"/>
                    </svg>
                );
                break;
            case "details-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/>
                    </svg>
                );
                break;
            case "staff-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 0,0 11,8A3,3 0 0,0 8,5A3,3 0 0,0 5,8A3,3 0 0,0 8,11M16,11A3,3 0 0,0 19,8A3,3 0 0,0 16,5A3,3 0 0,0 13,8A3,3 0 0,0 16,11Z"/>
                    </svg>
                );
                break;
            case "request-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M19,11H15V15H13V11H9V9H13V5H15V9H19M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M4,6H2V20A2,2 0 0,0 4,22H18V20H4V6Z"/>
                    </svg>
                );
                break;
            case "tender-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M14,12H15.5V14.82L17.94,16.23L17.19,17.53L14,15.69V12M4,2H18A2,2 0 0,1 20,4V10.1C21.24,11.36 22,13.09 22,15A7,7 0 0,1 15,22C13.09,22 11.36,21.24 10.1,20H4A2,2 0 0,1 2,18V4A2,2 0 0,1 4,2M4,15V18H8.67C8.24,17.09 8,16.07 8,15H4M4,8H10V5H4V8M18,8V5H12V8H18M4,13H8.29C8.63,11.85 9.26,10.82 10.1,10H4V13M15,10.15A4.85,4.85 0 0,0 10.15,15C10.15,17.68 12.32,19.85 15,19.85A4.85,4.85 0 0,0 19.85,15C19.85,12.32 17.68,10.15 15,10.15Z"/>
                    </svg>
                );
                break;
            case "close-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                    </svg>
                );
                break;
            case "plus-circle-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"/>
                    </svg>
                );
                break;
            case "minus-circle-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7"/>
                    </svg>
                );
                break;
            case "close-circle-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         onClick={this.onClick}
                         data-name={this.props.dataName}
                         fill={this.props.fill}
                        >
                        <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
                    </svg>
                );
                break;
            case "pin-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
                    </svg>
                );
                break;


            case "connect-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size }
                         height={this.props.size }
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M6,2A4,4 0 0,1 10,6C10,7.86 8.73,9.43 7,9.87V14.13C8.73,14.57 10,16.14 10,18A4,4 0 0,1 6,22A4,4 0 0,1 2,18C2,16.14 3.27,14.57 5,14.13V9.87C3.27,9.43 2,7.86 2,6A4,4 0 0,1 6,2M6,4A2,2 0 0,0 4,6A2,2 0 0,0 6,8A2,2 0 0,0 8,6A2,2 0 0,0 6,4M6,16A2,2 0 0,0 4,18A2,2 0 0,0 6,20A2,2 0 0,0 8,18A2,2 0 0,0 6,16M22,18A4,4 0 0,1 18,22A4,4 0 0,1 14,18C14,16.14 15.27,14.57 17,14.13V7H15V10.25L10.75,6L15,1.75V5H17A2,2 0 0,1 19,7V14.13C20.73,14.57 22,16.14 22,18M18,16A2,2 0 0,0 16,18A2,2 0 0,0 18,20A2,2 0 0,0 20,18A2,2 0 0,0 18,16Z"/>
                    </svg>
                );
                break;
            case "facebook-box":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M19,4V7H17A1,1 0 0,0 16,8V10H19V13H16V20H13V13H11V10H13V7.5C13,5.56 14.57,4 16.5,4M20,2H4A2,2 0 0,0 2,4V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V4C22,2.89 21.1,2 20,2Z"/>
                    </svg>
                );
                break;
            case "twitter-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M17.71,9.33C17.64,13.95 14.69,17.11 10.28,17.31C8.46,17.39 7.15,16.81 6,16.08C7.34,16.29 9,15.76 9.9,15C8.58,14.86 7.81,14.19 7.44,13.12C7.82,13.18 8.22,13.16 8.58,13.09C7.39,12.69 6.54,11.95 6.5,10.41C6.83,10.57 7.18,10.71 7.64,10.74C6.75,10.23 6.1,8.38 6.85,7.16C8.17,8.61 9.76,9.79 12.37,9.95C11.71,7.15 15.42,5.63 16.97,7.5C17.63,7.38 18.16,7.14 18.68,6.86C18.47,7.5 18.06,7.97 17.56,8.33C18.1,8.26 18.59,8.13 19,7.92C18.75,8.45 18.19,8.93 17.71,9.33M20,2H4A2,2 0 0,0 2,4V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V4C22,2.89 21.1,2 20,2Z"/>
                    </svg>
                );
                break;
            case "vk-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M19.54,14.6C21.09,16.04 21.41,16.73 21.46,16.82C22.1,17.88 20.76,17.96 20.76,17.96L18.18,18C18.18,18 17.62,18.11 16.9,17.61C15.93,16.95 15,15.22 14.31,15.45C13.6,15.68 13.62,17.23 13.62,17.23C13.62,17.23 13.62,17.45 13.46,17.62C13.28,17.81 12.93,17.74 12.93,17.74H11.78C11.78,17.74 9.23,18 7,15.67C4.55,13.13 2.39,8.13 2.39,8.13C2.39,8.13 2.27,7.83 2.4,7.66C2.55,7.5 2.97,7.5 2.97,7.5H5.73C5.73,7.5 6,7.5 6.17,7.66C6.32,7.77 6.41,8 6.41,8C6.41,8 6.85,9.11 7.45,10.13C8.6,12.12 9.13,12.55 9.5,12.34C10.1,12.03 9.93,9.53 9.93,9.53C9.93,9.53 9.94,8.62 9.64,8.22C9.41,7.91 8.97,7.81 8.78,7.79C8.62,7.77 8.88,7.41 9.21,7.24C9.71,7 10.58,7 11.62,7C12.43,7 12.66,7.06 12.97,7.13C13.93,7.36 13.6,8.25 13.6,10.37C13.6,11.06 13.5,12 13.97,12.33C14.18,12.47 14.7,12.35 16,10.16C16.6,9.12 17.06,7.89 17.06,7.89C17.06,7.89 17.16,7.68 17.31,7.58C17.47,7.5 17.69,7.5 17.69,7.5H20.59C20.59,7.5 21.47,7.4 21.61,7.79C21.76,8.2 21.28,9.17 20.09,10.74C18.15,13.34 17.93,13.1 19.54,14.6Z"/>
                    </svg>
                );
                break;
            case "linkedin-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M19,19H16V13.7A1.5,1.5 0 0,0 14.5,12.2A1.5,1.5 0 0,0 13,13.7V19H10V10H13V11.2C13.5,10.36 14.59,9.8 15.5,9.8A3.5,3.5 0 0,1 19,13.3M6.5,8.31C5.5,8.31 4.69,7.5 4.69,6.5A1.81,1.81 0 0,1 6.5,4.69C7.5,4.69 8.31,5.5 8.31,6.5A1.81,1.81 0 0,1 6.5,8.31M8,19H5V10H8M20,2H4C2.89,2 2,2.89 2,4V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V4C22,2.89 21.1,2 20,2Z"/>
                    </svg>
                );
                break;


            case "star-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z"/>
                    </svg>

                );
                break;
            case "delete-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         data-name={this.props.dataName}
                        >
                        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                    </svg>
                );
                break;
            case "bookmark-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M17,18V5H7V18L12,15.82L17,18M17,3A2,2 0 0,1 19,5V21L12,18L5,21V5C5,3.89 5.9,3 7,3H17M11,7H13V9H15V11H13V13H11V11H9V9H11V7Z"/>
                    </svg>
                );
                break;
            case "arrow-left-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         data-name={this.props.dataName}
                        >
                        <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"/>
                    </svg>
                );
                break;
            case "arrow-right-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         data-name={this.props.dataName}
                        >
                        <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"/>
                    </svg>
                );
                break;
            case "web-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                    </svg>
                );
                break;
            case "phone-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                    </svg>
                );
                break;
            case "skype-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M18,6C20.07,8.04 20.85,10.89 20.36,13.55C20.77,14.27 21,15.11 21,16A5,5 0 0,1 16,21C15.11,21 14.27,20.77 13.55,20.36C10.89,20.85 8.04,20.07 6,18C3.93,15.96 3.15,13.11 3.64,10.45C3.23,9.73 3,8.89 3,8A5,5 0 0,1 8,3C8.89,3 9.73,3.23 10.45,3.64C13.11,3.15 15.96,3.93 18,6M12.04,17.16C14.91,17.16 16.34,15.78 16.34,13.92C16.34,12.73 15.78,11.46 13.61,10.97L11.62,10.53C10.86,10.36 10,10.13 10,9.42C10,8.7 10.6,8.2 11.7,8.2C13.93,8.2 13.72,9.73 14.83,9.73C15.41,9.73 15.91,9.39 15.91,8.8C15.91,7.43 13.72,6.4 11.86,6.4C9.85,6.4 7.7,7.26 7.7,9.54C7.7,10.64 8.09,11.81 10.25,12.35L12.94,13.03C13.75,13.23 13.95,13.68 13.95,14.1C13.95,14.78 13.27,15.45 12.04,15.45C9.63,15.45 9.96,13.6 8.67,13.6C8.09,13.6 7.67,14 7.67,14.57C7.67,15.68 9,17.16 12.04,17.16Z"/>
                    </svg>
                );
                break;
            case "cellphone-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M16,18H7V4H16M11.5,22A1.5,1.5 0 0,1 10,20.5A1.5,1.5 0 0,1 11.5,19A1.5,1.5 0 0,1 13,20.5A1.5,1.5 0 0,1 11.5,22M15.5,1H7.5A2.5,2.5 0 0,0 5,3.5V20.5A2.5,2.5 0 0,0 7.5,23H15.5A2.5,2.5 0 0,0 18,20.5V3.5A2.5,2.5 0 0,0 15.5,1Z"/>
                    </svg>
                );
                break;
            case "mail-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M20,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V8L12,13L20,8V18M20,6L12,11L4,6V6H20V6Z"/>
                    </svg>
                );
                break;
            case "mail-filled-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                    </svg>
                );
                break;
            case "message-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         data-name={this.props.dataName}
                        >
                        <path d="M20,2A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H6L2,22V4C2,2.89 2.9,2 4,2H20M4,4V17.17L5.17,16H20V4H4M6,7H18V9H6V7M6,11H15V13H6V11Z" />
                    </svg>
                );
                break;
            case "clock-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
                    </svg>
                );
                break;
            case "pen-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         onClick={this.onClick}
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
                    </svg>
                );
                break;
            case "block-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         onClick={this.onClick}
                         data-name={this.props.dataName}
                        >
                        <path
                            d="M12,0A12,12 0 0,1 24,12A12,12 0 0,1 12,24A12,12 0 0,1 0,12A12,12 0 0,1 12,0M12,2A10,10 0 0,0 2,12C2,14.4 2.85,16.6 4.26,18.33L18.33,4.26C16.6,2.85 14.4,2 12,2M12,22A10,10 0 0,0 22,12C22,9.6 21.15,7.4 19.74,5.67L5.67,19.74C7.4,21.15 9.6,22 12,22Z"/>
                    </svg>
                );
                break;
            case "comment-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         onClick={this.onClick}
                         data-name={this.props.dataName}
                        >
                        <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                    </svg>
                );
                break;
            case "pay-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         onClick={this.onClick}
                         data-name={this.props.dataName}
                        >
                        <path d="M11 17h2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1h-3v-1h4V8h-2V7h-2v1h-1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3v1H9v2h2v1zm9-13H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V6h16v12z"/>
                    </svg>
                );
                break;
            case "cargo-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         onClick={this.onClick}
                         data-name={this.props.dataName}
                        >
                        <path d="M3 9h4V5H3v4zm0 5h4v-4H3v4zm5 0h4v-4H8v4zm5 0h4v-4h-4v4zM8 9h4V5H8v4zm5-4v4h4V5h-4zm5 9h4v-4h-4v4zM3 19h4v-4H3v4zm5 0h4v-4H8v4zm5 0h4v-4h-4v4zm5 0h4v-4h-4v4zm0-14v4h4V5h-4z"/>
                    </svg>
                );
                break;
            case "check-circle-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         onClick={this.onClick}
                         data-name={this.props.dataName}
                        >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                );
                break;
            case "edit-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         onClick={this.onClick}
                         data-name={this.props.dataName}
                        >
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                );
                break;
            case "view-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         onClick={this.onClick}
                         data-name={this.props.dataName}
                        >
                        <path d="M11.5 9C10.12 9 9 10.12 9 11.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S12.88 9 11.5 9zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-3.21 14.21l-2.91-2.91c-.69.44-1.51.7-2.39.7C9.01 16 7 13.99 7 11.5S9.01 7 11.5 7 16 9.01 16 11.5c0 .88-.26 1.69-.7 2.39l2.91 2.9-1.42 1.42z"/>
                    </svg>
                );
                break;
            case "add-circle-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         onClick={this.onClick}
                         data-name={this.props.dataName}
                        >
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>
                );
                break;
            case "check-icon":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         className={this.props.className}
                         width={this.props.size}
                         height={this.props.size}
                         onClick={this.onClick}
                         data-name={this.props.dataName}
                        >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                );
                break;


            default:
                return null;

        }
    }
});

export {Icon};