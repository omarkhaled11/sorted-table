import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Table} from './components/table/table';
import {useGetUsers} from './hooks/useGetUsers';

export const App: React.FC = () => {
  const {data, loading, error} = useGetUsers();

  if (loading) {
    return null;
  }

  if (error) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Table data={data || []} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
