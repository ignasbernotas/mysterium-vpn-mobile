/*
 * Copyright (C) 2018 The 'MysteriumNetwork/mysterium-vpn-mobile' Authors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Col, Grid, Icon, Text } from 'native-base'
import React, { ReactNode } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import colors from '../../../app/styles/colors'
import CountryFlag from './country-flag'
import { IProposal } from './proposal'
import ProposalList from './proposal-list'
import ProposalModal from './proposal-modal'

type PickerProps = {
  proposals: IProposal[]
  onSelect: (proposal: IProposal) => void
  onFavoriteToggle: () => void
  isFavoriteSelected: boolean
  placeholder: string
}

type PickerState = {
  modalIsOpen: boolean
  selectedProposal: IProposal | null
}

class ProposalPicker extends React.Component<PickerProps, PickerState> {
  constructor (props: PickerProps) {
    super(props)

    this.state = {
      modalIsOpen: false,
      selectedProposal: null
    }
  }

  public render (): ReactNode {
    return (
      <View style={styles.container}>
        <ProposalModal
          isOpen={this.state.modalIsOpen}
          onClose={() => this.closeProposalModal()}
        >
          <ProposalList
            proposals={this.props.proposals}
            onClose={() => this.closeProposalModal()}
            onSelect={(proposal: IProposal) => this.onProposalSelect(proposal)}
          />
        </ProposalModal>

        <View style={styles.proposalPicker}>
          <Grid>
            <Col size={85}>
              <TouchableOpacity style={styles.pickerButton} onPress={() => this.openProposalModal()}>
                <Grid>
                  <Col size={15} style={styles.countryFlagBox}>
                    <CountryFlag countryCode={this.countryCode || ''}/>
                  </Col>

                  <Col size={90} style={styles.countryNameBox}>
                    <Text>{this.countryName}</Text>
                  </Col>

                  <Col size={10} style={styles.arrowBox}>
                    <Icon style={styles.arrowIcon} name="arrow-down"/>
                  </Col>
                </Grid>
              </TouchableOpacity>
            </Col>
            <Col size={15} style={styles.favoritesBox}>
              <TouchableOpacity onPress={() => this.props.onFavoriteToggle()}>
                <Icon
                  style={styles.favoritesIcon}
                  name={this.props.isFavoriteSelected ? 'md-star' : 'md-star-outline'}
                />
              </TouchableOpacity>
            </Col>
          </Grid>
        </View>
      </View>
    )
  }

  private get countryCode (): string | null {
    if (!this.state.selectedProposal) {
      return null
    }

    const code = this.state.selectedProposal.countryCode
    if (code === null) {
      return null
    }
    return code.toLowerCase()
  }

  private get countryName (): string {
    if (!this.state.selectedProposal) {
      return this.props.placeholder
    }

    return this.state.selectedProposal.countryName || ''
  }

  private openProposalModal () {
    this.setState({ modalIsOpen: true })
  }

  private closeProposalModal () {
    this.setState({ modalIsOpen: false })
  }

  private onProposalSelect (proposal: IProposal) {
    this.props.onSelect(proposal)

    this.setState({
      selectedProposal: proposal,
      modalIsOpen: false
    })
  }
}

const boxHeight = 40
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff'
  },
  proposalPicker: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: colors.border,
    height: boxHeight
  },
  pickerButton: {
    height: boxHeight
  },
  countryFlagBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 0.5,
    borderColor: colors.border,
    borderRightWidth: 0.5,
    height: boxHeight
  },
  countryNameBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: boxHeight
  },
  arrowBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    width: '100%',
    height: boxHeight
  },
  arrowIcon: {
    fontSize: 20,
    marginTop: 4,
    color: colors.primary
  },
  favoritesBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 0.5,
    borderColor: colors.border
  },
  favoritesIcon: {
    color: colors.primary
  }
})

export default ProposalPicker
