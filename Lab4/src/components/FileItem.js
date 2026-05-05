
import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { formatBytes } from '../utils/formatters';

const Item = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    padding: 14px;
    background: #ffffff;
    margin-bottom: 10px;
    border-radius: 16px;
    border: 1px solid #ddd6fe;
    elevation: 2;
    shadow-color: #4c1d95;
    shadow-opacity: 0.07;
    shadow-radius: 4px;
`;

const Badge = styled.View`
    width: 48px;
    height: 48px;
    border-radius: 14px;
    align-items: center;
    justify-content: center;
    margin-right: 14px;
    background-color: ${props => props.isDir ? '#ede9fe' : '#fdf4ff'};
    border-width: 1px;
    border-color: ${props => props.isDir ? '#c4b5fd' : '#e9d5ff'};
`;

const FileName = styled.Text`
    font-size: 15px;
    font-weight: 700;
    color: #1e1b4b;
    margin-bottom: 3px;
`;

const Meta = styled.Text`
    font-size: 11px;
    color: #7c3aed;
`;

const Arrow = styled.Text`
    font-size: 18px;
    color: #c4b5fd;
    margin-left: 6px;
`;

export default function FileItem({ item, onPress, onLongPress }) {
    const isDir = item.isDirectory;
    const ext = item.name.includes('.') ? item.name.split('.').pop().toUpperCase() : '—';
    const date = item.modificationTime
        ? new Date(item.modificationTime * 1000).toLocaleDateString('uk-UA')
        : '';

    return (
        <Item onPress={onPress} onLongPress={onLongPress} activeOpacity={0.75}>
            <Badge isDir={isDir}>
                <Text style={{ fontSize: 22 }}>{isDir ? '📁' : '📄'}</Text>
            </Badge>
            <View style={{ flex: 1 }}>
                <FileName numberOfLines={1}>{item.name}</FileName>
                <Meta>
                    {isDir
                        ? 'Категорія нотаток'
                        : `${ext} • ${formatBytes(item.size)}${date ? ` • ${date}` : ''}`
                    }
                </Meta>
            </View>
            <Arrow>{isDir ? '›' : '✎'}</Arrow>
        </Item>
    );
}
