import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {User} from '../../api/httpClient';
import {capitalizeFirstLetter} from '../../utils/utils';

type TableHeaderProps = {
  row: User;
  sortOrder: 'asc' | 'desc';
  sortKey: keyof User | null;
  onColumnHeaderPress: (key: keyof User) => void;
};

export const TableHeader: React.FC<TableHeaderProps> = ({
  row,
  sortOrder,
  sortKey,
  onColumnHeaderPress,
}) => {
  if (!row || !Object.keys(row).length) {
    return null;
  }

  return Object.keys(row).map(key => {
    const handlePress = () => {
      onColumnHeaderPress(key as keyof User);
    };

    return (
      <Pressable key={key} style={styles.headerCell} onPress={handlePress}>
        <Text style={styles.headerText}>{capitalizeFirstLetter(key)}</Text>
        {sortOrder && sortKey === key && (
          <Icon name={`sort-alpha-${sortOrder}`} size={18} color="black" />
        )}
      </Pressable>
    );
  });
};

const styles = StyleSheet.create({
  headerCell: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignContent: 'center',
    borderRightWidth: 1,
    borderRightColor: 'grey',
    flexDirection: 'row',
  },

  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});
