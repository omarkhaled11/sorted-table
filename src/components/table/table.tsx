import React, {useEffect} from 'react';

import {View, StyleSheet} from 'react-native';
import {User} from '../../api/httpClient';
import {TableRow} from './table-row';
import {TableHeader} from './table-header';
import {compare} from '../../utils/utils';

interface TableProps {
  data: User[];
}

export const Table: React.FC<TableProps> = ({data}) => {
  const [sortKey, setSortKey] = React.useState<keyof User>('name');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');
  const [dataToDisplay, setDataToDisplay] = React.useState<User[]>(data);

  const sortedData = React.useMemo(() => {
    return data?.sort((a, b) => compare(a, b, sortKey, sortOrder));
  }, [data, sortKey, sortOrder]);

  useEffect(() => {
    setDataToDisplay(sortedData);
  }, [data, sortKey, sortOrder, dataToDisplay, sortedData]);

  const onColumnHeaderPress = (key: keyof User) => {
    const order = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(order);
    setSortKey(key);
  };

  const displayAgeWarningIcon = (age: number) => {
    return age < 18 ? 'warning' : undefined;
  };

  if (!dataToDisplay || !dataToDisplay.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TableHeader
          onColumnHeaderPress={onColumnHeaderPress}
          row={dataToDisplay[0]}
          sortOrder={sortOrder}
          sortKey={sortKey}
        />
      </View>

      {dataToDisplay.map((row, index) => {
        return (
          <View key={index} style={styles.rowContainer}>
            <TableRow row={row} icon={displayAgeWarningIcon(row.age)} />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  rowContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
});
