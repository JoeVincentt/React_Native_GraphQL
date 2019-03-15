import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_CURRENT_USER } from "./queries/index";

// const withSession = Component => props => {
//   return (
//     <Query query={GET_CURRENT_USER}>
//       {({ data, loading, refetch }) => {
//         if (loading) return null;
//         return <Component {...props} refetch={refetch} session={data} />;
//       }}
//     </Query>
//   );
// };

const withSession = ScreenComponent => {
  // turns this.props.navigation.state.params into this.params.<x>
  return class extends Component {
    static navigationOptions = ScreenComponent.navigationOptions;
    render() {
      return (
        <Query query={GET_CURRENT_USER}>
          {({ data, loading, refetch }) => {
            const { navigation, ...otherProps } = this.props;
            const {
              state: { params }
            } = navigation;
            return (
              <ScreenComponent
                {...this.props}
                {...params}
                refetch={refetch}
                session={data}
              />
            );
          }}
        </Query>
      );
    }
  };
};

export default withSession;
