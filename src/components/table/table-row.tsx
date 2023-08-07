import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {User} from '../../api/httpClient';

type TableRowProps = {
  row: User;
  icon?: string;
};

export const TableRow: React.FC<TableRowProps> = ({row, icon}) => {
  if (!row || !Object.keys(row).length) {
    return null;
  }

  return Object.values(row).map(value => {
    return (
      <View key={value} style={styles.cell}>
        <Text style={styles.cellText}>{value}</Text>
        <View style={styles.icon}>
          {icon && <Icon name={icon} size={18} color="black" />}
        </View>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    paddingVertical: 15,
    paddingLeft: 15,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: 'grey',
  },

  cellText: {
    fontSize: 16,
    color: 'black',
  },

  icon: {
    position: 'absolute',
    right: 15,
    top: 15,
    width: 20,
    height: 20,
  },
});
