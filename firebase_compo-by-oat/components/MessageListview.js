import React from 'react';
import { View, ListView, FlatList, StyleSheet, Text } from 'react-native';
import AccountRow from './AccountRow';

const AccountListview = ({ itemList }) => (
    <View style={{flexDirection:'row'}}>
      <View style={styles.container}>
        <FlatList
                data={itemList}
                renderItem={({ item }) => <AccountRow
                    name={item.name}
                    message={item.message}
                  //  email={item.email}
                    sender={item.sender}
                    image_url={item.image_url}
                />}

            />
      </View>



    </View>
);


const styles = StyleSheet.create({
    container: {

        flex: 1,
    }
});

export default AccountListview;
